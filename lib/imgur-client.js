var http = require('https'),
	fs = require('fs'),
	path = require('path'),
	qs = require('querystring'),
	requests = require('request');

function ImgurClient(options) {
	'use strict';

	options = options || {};
	if (options.clientId === undefined) {
		throw new Error('clientId is required!');
	}
	var publicAPI,
		host = 'api.imgur.com',
		imagePath = '/3/image',
		uploadPath = '/3/upload',
		albumPath = '/3/album',
		authorizationHeader = 'Client-ID ' + options.clientId
	;

	function _request2(opts, callback) {
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
				console.log(res);
				callback(err);
			}
		});
		req.write(
			'--' + opts.boundry + '\r\n' +
			'Content-Disposition: form-data; name="image"; filename="' + opts.file.filename + '"\r\n' +
			'Content-Type: application/octet-stream\r\n' +
			'Content-Transfer-Encoding: binary\r\n\r\n'
		);
		var stream = fs.createReadStream(opts.file.path, {bufferSize: 4 * 1024});
		stream.on('end', function () {
			req.end('\r\n--' + opts.boundry + '--');
			// console.dir(req);
		});
		stream.pipe(req, { end: false });
		if (opts.method === 'POST' && opts.body.length > 0) {
			req.write(opts.body);
		}
		req.on('error', function (err) {
			callback(err);
		});

		// req.end();
	}

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

	function uploadImage(params, callback) {
		var boundry = Math.random().toString(16); // random string
		var opts = {
			boundry: boundry,
			hostname: 'https://' + host,
			path: uploadPath + '/',
			headers: {
				// 'Content-Type': 'multipart/form-data; boundry="' + boundry + '"'
			},
			method: 'POST',
			file: params,
			body: {
				album: params.albumId
			}
		};
		var options = {
			headers: {
				'Authorization': authorizationHeader
			},
			url: opts.hostname + opts.path
		};
		console.log(opts);
		console.log(options);
		var r = requests.post(options, function (err, res, body) {
			callback(err, body);
		});
		var form = r.form();
		form.append('image', fs.createReadStream(params.path));
		form.append('album', params.albumId);
		// _request2(opts, callback);

	}

	function fetchAlbum(albumId, callback) {
		var opts = {
				hostname: host,
				headers: {},
				path: albumPath + '/' + albumId,
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


	function _request3(opts, callback) {
		var options = {
				headers: {
					'Authorization': authorizationHeader
				},
				url: opts.url,
				method: opts.method || 'GET'
			},
			r;
		if (options.method === 'POST') {
			options.formData = opts.formData;
		}
		r = requests(options, function (err, response, body) {
			if (err) throw err;
			callback(err, body);
		});
	}

	function fetchAlbumImages(albumId, callback) {
		var opts = {
			url: 'https://' + host + albumPath + '/' + albumId + '/images',
			method: 'GET'
		};
		// console.log(opts);
		_request3(opts, callback);
	}


	publicAPI = {
		createAlbum: createAlbum,
		uploadImage: uploadImage,
		fetchImage: fetchImage,
		fetchAlbum: fetchAlbum,
		fetchAlbumImages: fetchAlbumImages
	};

	return publicAPI;
}

exports = module.exports = ImgurClient;
