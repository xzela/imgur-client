var requests = require('request');

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
	* [request description]
	*
	* @param  {Object}   opts     A set of options/params to be sent
	*                             along with the request.
	* @param  {Function} callback callback function to execute once
	*                             everything is done
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
			};

		// add the authorization headers here if not supplied
		if (options.headers.Authorization === undefined) {
			options.headers.Authorization = authorizationHeader;
		}

		// got form body?
		if (opts.form) {
			options.form = __trim(opts.form);
		}

		// got multipart form body?
		if (opts.formData) {
			options.formData = __trim(opts.formData);
		}

		requests(options, function (err, response, body) {
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
