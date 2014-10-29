var client = require('./client');

function ImgurImage(options) {
	'use strict';

	var publicAPI = Object.create(client(options)),
		URLs = {
			image: '/3/image',
			upload: '/3/upload'
		};

	function fetch(imageId, callback) {
		var opts = {
			path: URLs.image + '/' + imageId,
			method: 'GET'
		};

		publicAPI.request(opts, callback);
	}

	publicAPI.fetch = fetch;

	return publicAPI;
}

module.exports = ImgurImage;
