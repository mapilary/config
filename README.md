Config
=========

Config is tiny class, which allows to set and get values using dot syntax written in javascript and covered by jasmine spec. It has no dependecies (just plain javascript) and is written as universal module [according to UMD](https://github.com/umdjs/umd).

Motivation behind writing this was to have nice and readable configuration stored in localStorage, in favour of using JSON.stringify for persising objects.

It can use javascript object (hashmap) as storage or localStorage as persistent storage,

Works in environments:
  - nodejs
  - in browsers

For using Config in Browser include script in html header or use as RequireJS module.

Version
----

1.0

How to use
--------------

#### Simple usage scenario
```javascript
var config = new Config();
config.set('foo', {bar: {baz: 'buzz'}});
config.get('foo.bar.baz'); // returns buzz
```

#### Return partial key as object
```javascript
var config = new Config();
config.set('foo', {bar: {baz: 'buzz'}});
config.get('foo'); // returns {bar: {baz: 'buzz'}}
```

#### Using localStorage as persistent storage
```javascript
var config = new Config(window.localStorage);
config.set('foo', {bar: {baz: 'buzz'}});
config.get('foo.bar.baz'); // returns buzz
```

#### Using initial settings object to configure Config
```javascript
var settings = {foo: {bar: {baz: 'buzz'}}};
var config = new Config({}, settings);
config.get('foo.bar.baz'); // returns buzz
```

Installation
--------------
### Bower for use in browsers
```sh
bower install https://github.com/mapilary/config
```
### NPM for NodeJS
```sh
npm install https://github.com/mapilary/config
```
### Run tests
```sh
npm test
```

License
----

MIT