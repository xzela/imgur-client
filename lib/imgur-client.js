var http = require('https');

function ImgurClient(options) {
	'use strict';
	options = options || {};
	if (options.clientId === undefined) {
		throw new Error('clientId is required!');
	}
	var publicAPI,
		host = 'api.imgur.com',
		uploadUrl = 'https://api.imgur.com/3/upload',
		albumPath = '/3/album'
	;

	function upload() {
		console.log("uploading");
	}

	function getOptions() {
		return options;
	}

	function fetchAlbum(ambumId, callback) {
		var opts = {
				hostname: host,
				headers: {
					'Authorization': 'Client-ID ' + 'e63ca2024c581ec'
				},
				path: albumPath + '/' + ambumId,
				method: 'GET'
			},
			data;
		var req = http.request(opts, function (res) {
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function () {
				console.log(data);
				console.log("request has ended");
			});
		});
		req.on('error', function (err) {
			callback(err);
		});
		req.end();
	}

	publicAPI = {
		upload: upload,
		getOptions: getOptions,
		fetchAlbum: fetchAlbum
	};

	return publicAPI;
}

exports = module.exports = ImgurClient;
