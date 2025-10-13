function _doGet() {
	const result = doGet();
	console.log(result.getContent());
}

function doGet(): GoogleAppsScript.HTML.HtmlOutput {
	return HtmlService.createHtmlOutputFromFile("index")
		.setTitle("File Uploader")
		.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
