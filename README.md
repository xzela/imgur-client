#imgur-client


Client for imgur (may abandoned this project at some point)

This is my first attempt at creating a module that has zero (`0`) dependencies.

### To install
Install from `npm` (TBD)

```
	$ npm install imgur-client
```

### Usage

General module usage

#### require options:

* `clientId`: the client id you are assigned when creating an application on imgur. See [https://api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient) for more details.

#### optional options (TBD):
* `username`: The username you wish to use for creating albums and uploading image.
* `password`: The password associated with the `username`.

```
	var Imgur = require('imgur-client);
	
	var imgur = Imgur({
		clientId: 'MY_CLIENT_ID'
	});
	
	imgur.fetchAlbum('ALBUM_ID', function (err, data) {
		if (err) {
			throw err;
		}
		console.log(data);
	});

	imgur.fetchImage('IMAGE_ID', function (err, data) {
		if (err) {
			throw err;
		}
		console.log(data);
	});
	
	
```

### Public API

Here are all of the public API access points:

* `fetchAlbum`: `imgur.fetchAlbum(albumId, callback)` requires a valid `albumId`. 
	* `callback` signature is as follows: `function(err, data)`.
	* `data` should be an `Album` data model. See [Album Data Model](https://api.imgur.com/models/album) for more information.
* `fetchImage`: `imgur.fetchAlbum(imageId, callback)` requires a valid `albumId`. 
	* `callback` signature is as follows: `function(err, data)`.
	* `data` should be an `Image` data model. See [Image Data Model](https://api.imgur.com/models/image) for more information.
