
var image = require('./image'),
	album = require('./album');

module.exports = function (options) {
	return {
		image: image(options),
		album: album(options)
	};
};
