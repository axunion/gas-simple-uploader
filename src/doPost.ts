type PostSuccessResponse = {
	result: "done";
};

type PostErrorResponse = {
	result: "error";
	error: string;
};

type PostResponse = PostSuccessResponse | PostErrorResponse;

function _doPost() {
	const e = { parameter: { type: "" } };
	const result = doPost(e as unknown as GoogleAppsScript.Events.DoPost);
	console.log(result.getContent());
}

function doPost(
	e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput {
	let response: PostResponse = { result: "done" };

	try {
		const parameter = JSON.parse(e.postData.contents);
		const type = parameter.type;

		if (!type) {
			throw new Error("Invalid parameter.");
		}
	} catch (error) {
		response = {
			result: "error",
			error: error.message,
		};
	}

	return ContentService.createTextOutput(JSON.stringify(response));
}
