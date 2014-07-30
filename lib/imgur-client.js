var http = require('https');

function ImgurClient(options) {
	'use strict';
	options = options || {};
	if (options.clientId === undefined) {
		throw new Error('clientId is required!');
	}
	var publicAPI,
		host = 'api.imgur.com',
		imagePath = '/3/image',
		albumPath = '/3/album'
	;

	function _request(opts, callback) {
		var data = '';
		var req = http.request(opts, function (res) {
			if (res.statusCode === 200) {
				console.log(res.statusCode);
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
					var json = JSON.parse(data);
					callback(null, json);
				});
			} else {
				var err = new Error("Bad statusCode: " + res.statusCode);
				callback(err);
			}
		});
		req.on('error', function (err) {
			callback(err);
		});
		req.end();
	}

	function fetchAlbum(ambumId, callback) {
		var opts = {
				hostname: host,
				headers: {
					'Authorization': 'Client-ID ' + options.clientId
				},
				path: albumPath + '/' + ambumId,
				method: 'GET'
			};
		_request(opts, callback);
	}

	function fetchImage(imageId, callback) {
		var opts = {
				hostname: host,
				headers: {
					'Authorization': 'Client-ID ' + options.clientId
				},
				path: imagePath + '/' + imageId,
				method: 'GET'
			};
		_request(opts, callback);
	}

	publicAPI = {
		fetchImage: fetchImage,
		fetchAlbum: fetchAlbum
	};

	return publicAPI;
}

exports = module.exports = ImgurClient;
