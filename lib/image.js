var client = require('./client');

function ImgurImage(options) {
	'use strict';

	var publicAPI = Object.create(client(options)),
		base = '/3/image',
		URLs = {
			image: '/3/image',
			upload: '/3/upload'
		};

	function fetch(imageId, callback) {
		var opts = {
			path: base + '/' + imageId,
			method: 'GET'
		};

		publicAPI.request(opts, callback);
	}


	function _delete(imageId, callback) {
		var opts = {
			path: base + '/' + imageId,
			method: 'DELETE',
		};

		publicAPI.request(opts, callback);
	}


	/**
	 * [upload description]
	 *
	 * @param  {Object}   params   [description]
	 * @param  {Function} callback
	 *
	 * @return null
	 */
	function upload(params, callback) {
		var opts = {
			path: base,
			method: 'POST',
			formData: {
				image: params.image, // binary | url | base64 string
				album: params.album || null, // albumId
				type: params.type || null, // image type: binary | url | base64 string
				name: params.name || null,
				title: params.title || null,
				description: params.description || null
			}
		};

		if (!params.image) {
			return callback(new Error('image parameter is required'));
		}

		publicAPI.request(opts, callback);
	}

	publicAPI.fetch = fetch;
	publicAPI.upload = upload;
	publicAPI.delete = _delete;

	return publicAPI;
}

module.exports = ImgurImage;
