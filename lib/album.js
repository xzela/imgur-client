var client = require('./client');

/**
 * [ImgurAlbum description]
 *
 * Docs: https://api.imgur.com/endpoints/album
 *
 * @param {[type]} options [description]
 *
 */
function ImgurAlbum(options) {
	'use strict';

	var publicAPI = Object.create(client(options)),
		endPoints = {
			album: '/3/album',
			upload: '/3/upload'
		};

	/**
	 * [addImages description]
	 *
	 * @param {String}   albumId  [description]
	 * @param {Array}   imageIds [description]
	 * @param {Function} callback [description]
	 *
	 * @return null
	 */
	function addImages(albumId, imageIds, callback) {
		var opts = {
			path: endPoints.album + '/add',
			method: 'POST',
			form: {
				ids: imageIds.join(',')
			}
		};
		publicAPI.request(opts, callback);
	}

	/**
	* [createAlbum description]
	*
	* @param {Object}   params   [description]
	* @param {Function} callback [description]
	*
	* @return null
	*/
	function create(params, callback) {
		var opts = {
			path: endPoints.album,
			method: 'POST',
			form: {
				ids: params.ids || [], // a set of ids for images you want to include
				title: params.title || null, // a title
				description: params.description || null, // a description
				privacy: params.privacy || null, // public | hidden | secret
				layout: params.layout || null, // blog | grid | horizontal | vertical
				cover: params.cover || null // some image id
			}
		};

		publicAPI.request(opts, callback);
	}

	/**
	 * [_delete description]
	 *
	 * @param  {String}   albumId  [description]
	 * @param  {Function} callback [description]
	 *
	 * @return {[type]}            [description]
	 */
	function _delete(albumId, callback) {
		var opts = {
			path: endPoints.album + '/' + albumId,
			method: 'DELETE'
		};

		publicAPI.request(opts, callback);
	}

	/**
	* [fetchAlbum description]
	*
	* @param {[type]}   albumId  [description]
	* @param {Function} callback [description]
	*
	* @return null
	*/
	function fetch(albumId, callback) {
		var opts = {
			url: _formatUrl(albumPath + '/' + albumId),
			method: 'GET'
		};

		publicAPI.request(opts, callback);
	}


	/**
	* [fetchAlbumImages description]
	*
	* @param {[type]}   albumId  [description]
	* @param {Function} callback [description]
	*
	* @return null
	*/
	function images(albumId, callback) {
		var opts = {
			url: _formatUrl(albumPath + '/' + albumId + '/images'),
			method: 'GET'
		};

		publicAPI.request(opts, callback);
	}

	/**
	 * [update description]
	 *
	 * @param  {String}   albumId  An albumId
	 * @param  {Object}   params   A set of parameters
	 * @param  {Function} callback
	 *
	 * @return null
	 */
	function update(albumId, params, callback) {
		var opts = {
			path: endPoints.album + '/' + albumId,
			method: 'POST',
			form: {
				ids: params.ids || [], // a set of ids for images you want to include
				title: params.title || null, // a title
				description: params.description || null, // a description
				privacy: params.privacy || null, // public | hidden | secret
				layout: params.layout || null, // blog | grid | horizontal | vertical
				cover: params.cover || null // some image id
			}
		};

		publicAPI.request(opts, callback);
	}

	/**
	 * [removeImage description]
	 *
	 * @param {String}   albumId  An albumId
	 * @param {Array}   imageIds  An array of imageIds to be removed
	 * @param {Function} callback
	 *
	 * @return null
	 */
	function removeImages(albumId, imageIds, callback) {
		var opts = {
			path: endPoints.album + '/' + albumId + '/remove_images',
			method: 'DELETE',
			form: {
				ids: imageIds
			}
		};

		publicAPI.request(opts, callback);
	}

	// expose the API
	publicAPI.create = create;
	publicAPI.fetch = fetch;
	publicAPI.images = images;
	publicAPI.delete = _delete;
	publicAPI.removeImages = removeImages;

	return publicAPI;
}

var exports = module.exports = ImgurAlbum;
