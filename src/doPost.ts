type PostSuccessResponse = {
	result: "done";
};

type PostErrorResponse = {
	result: "error";
	error: string;
};

type PostResponse = PostSuccessResponse | PostErrorResponse;

function _doPost() {
	const mockBlob = Utilities.newBlob("test content", "text/plain", "test.txt");
	const e = {
		parameter: {
			file: mockBlob,
		},
	} as unknown as GoogleAppsScript.Events.DoPost;

	const result = doPost(e);
	console.log(result.getContent());
}

function doPost(
	e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput {
	let response: PostResponse;

	try {
		const fileBlob = e.parameter.file;

		if (!fileBlob) {
			throw new Error("No file uploaded.");
		}

		const blob = fileBlob as unknown as GoogleAppsScript.Base.Blob;
		const fileName = blob.getName();
		const folderId =
			PropertiesService.getScriptProperties().getProperty("UPLOAD_FOLDER_ID");

		if (!folderId) {
			throw new Error("Folder ID is not set.");
		}

		const folder = DriveApp.getFolderById(folderId);
		folder.createFile(blob.setName(fileName));

		response = {
			result: "done",
		};
	} catch (error) {
		response = {
			result: "error",
			error: error instanceof Error ? error.message : String(error),
		};
	}

	return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
		ContentService.MimeType.JSON,
	);
}
