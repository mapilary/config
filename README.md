Config
=========

Config is tiny class, which allows to set and get values using dot syntax written in javascript and covered by jasmine spec. It has no dependecies (just plain javascript) and is written as universal module [according to UMD](https://github.com/umdjs/umd).

Motivation behind writing this was to have nice and readable configuration stored in localStorage, in favour of using JSON.stringify for persising objects.


####Instead of one big string value:
![](https://raw.github.com/mapilary/config/gh-pages/images/localstorage.png)

####you can get this easy editable structure of key value(s):
![](https://raw.github.com/mapilary/config/gh-pages/images/config.png)


It can use javascript object (hashmap) as storage or localStorage as persistent storage,

Works in environments:
  - nodejs
  - in browsers

For using Config in Browser include script in html header or use as RequireJS module.

Changelog
---------

1.2
===
* fixing unintentional remove bug
* new method clear
* deprecating prefix in favour of namespace
* deprecating remove(namespace) in favour of clear method

1.1
===
* constructor now accepts options object and settings object
* added option prefix to avoid collision when using more applications on same domain
* remove method will also delete all nested sub keys

How to use
----------

#### Simple usage scenario
```javascript
var config = new Config();
config.set('foo', {bar: {baz: 'buzz'}});
config.get('foo.bar.baz'); // returns buzz
```

#### Setting data in constructor
```javascript
var config = new Config({}, {foo: {bar: 'buzz'}});
config.get('foo.bar'); // returns buzz
```

#### Setting as object
```javascript
var config = new Config();
config.set({foo: {bar: 'baz'}});
config.get('foo'); // returns {bar: 'baz'}
```

#### Return sub key as object
```javascript
var config = new Config();
config.set('foo', {bar: {baz: 'buzz'}});
config.get('foo'); // returns {bar: {baz: 'buzz'}}
```

#### Using localStorage as persistent storage
```javascript
var config = new Config({storage: window.localStorage});
config.set('foo', {bar: {baz: 'buzz'}});
config.get('foo.bar.baz'); // returns buzz
```

#### Remove key(s)
```javascript
var settings = {foo: {bar: {baz: 'buzz'}}};
var config = new Config({}, settings);
config.remove('foo'); // delete foo and all sub-keys
```

#### Using namespaces
```javascript
var config = new Config({namespace: 'mapilary'});
config.set('foo', {bar: {baz: 'buzz'}});
config.get('foo.bar.baz'); // returns buzz
config.clear(); //remove all keys from namespace
```

Installation
--------------
### Bower for use in browsers
```sh
bower install git://github.com/mapilary/config.git
```
### NPM for NodeJS
```sh
npm install git://github.com/mapilary/config.git
```
### Run tests
```sh
npm test
```

Version
----

1.1

License
----

MIT