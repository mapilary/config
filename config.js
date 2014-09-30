(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.Config = factory();
  }
}(this, function () {

    var isEmptyObject = function (obj) {
        var name;
        for (name in obj) return false;
        return true;
    };

    /**
      *  Create an instance of Config
      *
      *  When not specified by options.storage hashmap will be
      *  used for storing data.
      *
      *  Notice: direct key has always priority over nested key
      *  if keys foo.bar and foo both exists only foo will be returned
      *
      *  @consructor
      *  @this {Config}
      *  @param {Object} [options]
      *  @param {Object} options.storage - data store ({}, localStorage, ...)
      *  @param {string} options.namespace - optional prefix for all keys
      *  @param {Object} [data] - initial dataset
      */

    var Config = function (options, data) {
        var key;
        options = options || {};
        data = data || {};
        this.storage = options.storage || {};
        this.ns = options.namespace || options.prefix || '';
        if (options.prefix) {
            console.log('Using prefix is deprecated. Use namespace instead.');
        }
        for (key in data) {
            this.set(key, data[key]);
        }
    };

    Config.prototype = {

        /**
          * Get value for key using dot notation
          *
          * Config.get('environment.api.basePath');
          * If null key provided returns all key/values within namespace
          *
          *  @this {Config}
          *  @param {string} [key]
          *  @return {Number|String|Object|Array} value
          */

        get: function (key) {
            key = key || '';
            if (this.ns) {
                key = this.ns + ((key && key.length > 0) ? '.' + key : '');
            }
            var storage = this.storage,
                value   = storage[key];
            if (value) {
                return JSON.parse(value);
            }
            var _key;
            var flattenKeys = function (keys, value) {
                var key = keys.shift();
                while (keys.constructor === Array && keys.length > 0) {
                    value[key] = value[key] || {};
                    return flattenKeys(keys, value[key]);
                }
                value[key] = JSON.parse(keyValue);
            };
            //recursively search for key
            for (_key in storage) {
                if (!key || _key.indexOf(key + '.') === 0) {
                    value = value || {};
                    var keyValue = storage[_key],
                        __key = _key.substr((key.length > 0) ? key.length + 1 : 0),
                        keySplit = __key.split('.');
                    flattenKeys(keySplit, value);
                }
            }
            return value;
        },

        /**
          * Set value for key using dot notation
          *
          * Value object is automatically flattened (expanded)
          * Config.set('environment.api.basePath', 'http://someurl');
          * is same as:
          * Config.set('environment', {api: {basePath: 'http://someurl'}});
          *
          *  @this {Config}
          *  @param {string} key
          *  @param {Number|String|Object|Array} value
          */

        set: function (key, value) {
            key = (this.ns) ? this.ns + '.' + key : key;
            var storage = this.storage;
            (function expandKeys (key, value) {
                var _key, _val = value;
                if (_val && _val.constructor === Array) {
                    //noop
                } else if (_val === Object(_val)) {
                    if (!isEmptyObject(_val)) {
                        for (_key in _val) {
                            expandKeys(key + '.' + _key, _val[_key]);
                        }
                        return;
                    }
                }
                storage[key] = JSON.stringify(_val);
            })(key, value);
        },


        /**
          * Remove key and all nested keys
          *
          *  @this {Config}
          *  @param {string} key
          */

        remove: function (key) {
            var _key, storage = this.storage;
            if (!key) {
                return;
            }
            if (key === this.ns) {
                console.log('Removing prefix is deprecated. Use clear instead.');
                return this.clear();
            }
            if (this.ns) {
                key = this.ns + '.' + key;
            }
            if (storage[key]) {
                delete storage[key];
                return;
            }
            // remove all nested keys
            for (_key in storage) {
                if (_key.indexOf(key) === 0) {
                    delete storage[_key];
                }
            }
        },


        /**
          * Remove all keys within namespace
          *
          */

        clear: function () {
            var _key, storage = this.storage;
            for (_key in storage) {
                if (_key.indexOf(this.ns) === 0) {
                    delete storage[_key];
                }
            }
        }
    };

    return Config;
}));