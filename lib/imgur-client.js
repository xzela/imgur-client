
function ImgurClient(options) {
	'use strict';
	options = options || {};
	var publicAPI;

	function upload() {
		console.log("uploading");
	}

	function getOptions() {
		return options;
	}

	publicAPI = {
		upload: upload,
		getOptions: getOptions
	};

	return publicAPI;
}

exports = module.exports = ImgurClient;
