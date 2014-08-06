var http = require('https'),
	qs = require('querystring');

function ImgurClient(options) {
	'use strict';
	options = options || {};
	if (options.clientId === undefined) {
		throw new Error('clientId is required!');
	}
	var publicAPI,
		host = 'api.imgur.com',
		imagePath = '/3/image',
		albumPath = '/3/album',
		authorizationHeader = 'Client-ID ' + options.clientId
	;

	function _request(opts, callback) {
		var data = '';

		opts.headers['Authorization'] = authorizationHeader;
		if (opts.method === 'POST') {
			opts.body = qs.stringify(opts.body);

		}
		var req = http.request(opts, function (res) {
			if (res.statusCode === 200) {
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
		if (opts.method === 'POST' && opts.body.length > 0) {
			req.write(opts.body);
		}
		req.on('error', function (err) {
			callback(err);
		});
		console.dir(req);
		req.end();
	}

	function createAlbum(params, callback) {
		var opts = {
			hostname: host,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			path: albumPath + '/',
			method: 'POST'
		};

		if (params) {
			opts['body'] = params;
		}
		_request(opts, callback);
	}

	function uploadImage(opts, callback) {
		// @TODO
		return null;
	}

	function fetchAlbum(ambumId, callback) {
		var opts = {
				hostname: host,
				headers: {},
				path: albumPath + '/' + ambumId,
				method: 'GET'
			};
		_request(opts, callback);
	}

	function fetchImage(imageId, callback) {
		var opts = {
				hostname: host,
				headers: {},
				path: imagePath + '/' + imageId,
				method: 'GET'
			};
		_request(opts, callback);
	}

	publicAPI = {
		createAlbum: createAlbum,

		fetchImage: fetchImage,
		fetchAlbum: fetchAlbum
	};

	return publicAPI;
}

exports = module.exports = ImgurClient;
