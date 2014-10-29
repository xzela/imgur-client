var ImgurImage = require('./image'),
	requests = require('request');

function ImgurClient(options) {
	'use strict';

	options = options || {};
	if (options.clientId === undefined) {
		throw new Error('clientId is required!');
	}

	var publicAPI,
		protocol = 'https://',
		host = 'api.imgur.com',
		authorizationHeader = 'Client-ID ' + options.clientId;

	/**
	* Formats the URL
	*
	* @param {String} path [description]
	*
	* @return {String} a properly formated url
	*/
	function _formatUrl(path) {
		var url = protocol + host + '/' + path;
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
	function request(opts, callback) {

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
				url: _formatUrl(opts.path),
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

	publicAPI = {
		request: request
	};

	return publicAPI;

}

module.exports = ImgurClient;
