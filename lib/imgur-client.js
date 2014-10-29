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

	/**
	 * [_formatUrl description]
	 *
	 * @param {[type]} path [description]
	 *
	 * @return {String} a properly formated url
	 */
	function _formatUrl(path) {
		var url = 'https://' + host + '/' + path;
		return url;
	}

	/**
	 * [_request description]
	 *
	 * @param  {[type]}   opts     [description]
	 * @param  {Function} callback [description]
	 *
	 * @return null
	 */
	function _request(opts, callback) {

		/**
		 * Removes any empty (null or undefined) properties from an object
		 *
		 * @param  {Object} object
		 *
		 * @return {Object}		a cleaned object
		 */
		function __trim(object) {
			for (var i in object) {
				if (object[i] === null || object[i] === undefined) {
					delete object[i];
				}
			}
			return object;
		}

		var options = {
				headers: opts.headers || {},
				url: opts.url,
				method: opts.method || 'GET'
			},
			r;

		// add the authorization headers here if not supplied
		if (options.headers.Authorization === undefined) {
			options.headers.Authorization = authorizationHeader;
		}

		// only post data can send formData
		if (options.method === 'POST') {
			options.formData = __trim(opts.formData);
		}
		r = requests(options, function (err, response, body) {
			if (err) throw err;
			var json = null;
			if (response.statusCode === 200) {
				// attempt to parse
				try {
					json = JSON.parse(body);
				} catch (e) {
					err = e;
				}
			} else {
				console.log(body);
				err = new Error('bad statuscode: ' + response.statusCode);
			}
			callback(err, json);
		});
	}

	/**
	 * [createAlbum description]
	 *
	 * @param {[type]}   params   [description]
	 * @param {Function} callback [description]
	 *
	 * @return null
	 */
	function createAlbum(params, callback) {
		var opts = {
			url: _formatUrl(albumPath),
			method: 'POST',
			formData: {
				ids: params.ids || [], // a set of ids for images you want to include
				title: params.title || null, // a title
				description: params.description || null, // a description
				privacy: params.privacy || null, // public | hidden | secret
				layout: params.layout || null, // blog | grid | horizontal | vertical
				cover: params.cover || null // some image id
			}
		};
		_request(opts, callback);
	}

	/**
	 * [uploadImage description]
	 *
	 * @param {[type]}   params   [description]
	 * @param {Function} callback [description]
	 *
	 * @return null
	 */
	function uploadImage(params, callback) {
		var opts;
		if (!params) {
			return callback(new Error('params is undefined ot something'));
		}
		if (!params.image) {
			return callback(new Error('params is missing the image property!'));
		}
		opts = {
			url: _formatUrl(uploadPath),
			formData: {
				image: params.image, // must be a binary stream!
				album: params.album || null,
				name: params.name || null,
				title: params.title || null,
				description: params.description || null
			},
			method: 'POST'
		};
		_request(opts, callback);
	}

	/**
	 * [fetchImage description]
	 *
	 * @param {[type]}   imageId  [description]
	 * @param {Function} callback [description]
	 *
	 * @return null
	 */
	function fetchImage(imageId, callback) {
		var opts = {
			url: _formatUrl(imagePath + '/' + imageId),
			method: 'GET'
		};
		_request(opts, callback);
	}

	/**
	 * [fetchAlbum description]
	 *
	 * @param {[type]}   albumId  [description]
	 * @param {Function} callback [description]
	 *
	 * @return null
	 */
	function fetchAlbum(albumId, callback) {
		var opts = {
			url: _formatUrl(albumPath + '/' + albumId),
			method: 'GET'
		};
		_request(opts, callback);
	}

	/**
	 * [fetchAlbumImages description]
	 *
	 * @param {[type]}   albumId  [description]
	 * @param {Function} callback [description]
	 *
	 * @return null
	 */
	function fetchAlbumImages(albumId, callback) {
		var opts = {
			url: _formatUrl(albumPath + '/' + albumId + '/images'),
			method: 'GET'
		};
		_request(opts, callback);
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
