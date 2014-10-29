#imgur-client

Node client for the imgur api.

~~This is my first attempt at creating a module that has zero (`0`) dependencies.~~ 

Not gonna happen... form uploads is hard. :(

### Dependencies
This module has the following:

* [request](https://github.com/request/request.git)


### To install
Install from `npm` (TBD)

```
	$ npm install imgur-client
```

### Usage

General module usage

#### require options:

* `clientId`: the client id you are assigned when creating an application on imgur. See [https://api.imgur.com/oauth2/addclient](https://api.imgur.com/oauth2/addclient) for more details.


### Public API

Here are all of the public API access points:

* `fetchAlbum`: `imgur.fetchAlbum(albumId, callback)` requires a valid `albumId`. 
	* `callback` signature is as follows: `function(err, data)`.
	* `data` should be an `Album` data model. See [Album Data Model](https://api.imgur.com/models/album) for more information.
* `fetchImage`: `imgur.fetchAlbum(imageId, callback)` requires a valid `albumId`. 
	* `callback` signature is as follows: `function(err, data)`.
	* `data` should be an `Image` data model. See [Image Data Model](https://api.imgur.com/models/image) for more information.
