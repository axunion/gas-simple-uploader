type UploadSuccessResponse = {
	result: "done";
};

type UploadErrorResponse = {
	result: "error";
	error: string;
};

type UploadResponse = UploadSuccessResponse | UploadErrorResponse;

function _uploadFile() {
	const testContent = "test content";
	const base64Data = Utilities.base64Encode(testContent);

	const result = uploadFile(base64Data, "test.txt", "text/plain");
	console.log(result);
}

function uploadFile(
	base64Data: string,
	fileName: string,
	mimeType: string,
): UploadResponse {
	try {
		const decodedData = Utilities.base64Decode(base64Data);
		const blob = Utilities.newBlob(decodedData, mimeType, fileName);

		const folderId =
			PropertiesService.getScriptProperties().getProperty("UPLOAD_FOLDER_ID");

		if (!folderId) {
			throw new Error("Folder ID is not set.");
		}

		const folder = DriveApp.getFolderById(folderId);
		folder.createFile(blob);

		return {
			result: "done",
		};
	} catch (error) {
		return {
			result: "error",
			error: error instanceof Error ? error.message : String(error),
		};
	}
}
