type GetSuccessResponse = {
	result: "done";
	data: unknown;
};

type GetErrorResponse = {
	result: "error";
	error: string;
};

type GetResponse = GetSuccessResponse | GetErrorResponse;

function _doGet() {
	const e = { parameter: { type: "" } };
	const result = doGet(e as unknown as GoogleAppsScript.Events.DoGet);
	console.log(result.getContent());
}

function doGet(
	e: GoogleAppsScript.Events.DoGet,
): GoogleAppsScript.Content.TextOutput {
	let response: GetResponse;

	try {
		const type = e.parameter.type;

		if (!type) {
			throw new Error("Invalid parameter.");
		}

		response = {
			result: "done",
			data: { message: `Received type: ${type}` },
		};
	} catch (error) {
		response = {
			result: "error",
			error: error.message,
		};
	}

	return ContentService.createTextOutput(JSON.stringify(response));
}
