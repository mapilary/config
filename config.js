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

    /**
      *  Config constructor
      *  options: Object
      *    storage: [Array, locationStorage]
      *    prefix: (string) custom prefix to be added to each key
      *
      *  Warning: direct key has always priority over nested key
      *  if keys foo.bar and foo both exists only foo will be returned
      */

    var Config = function (options, settings) {
        options = options || {};
        settings = settings || {};
        this.storage = options.storage || {};
        this.prefix = options.prefix;
        for (var key in settings) {
            this.set(key, settings[key]);
        }
    };

    Config.prototype = {

        /**
          *  Get value by key
          *  Allows dot notation eg.:
          *  Config.get('environment.api.basePath');
          *  If null key provided returns whole prefix (if specified in constructor)
          */

        get: function (key) {
            if (this.prefix) {
                key = this.prefix + ((key && key.length > 0) ? '.' + key : '');
            }
            var storage = this.storage,
                value   = storage[key],
                isArray = new RegExp('^Array\\((.*)\\);');
            if (typeof value === 'undefined') {
                var _key;
                //recursively search for key
                for (_key in storage) {
                    if (_key.indexOf(key + '.') === 0) {
                        value = value || {};
                        var keyValue = storage[_key],
                            __key = _key.substr((key.length > 0) ? key.length + 1 : 0),
                            keySplit = __key.split('.');
                        (function flattenKeys (keys, value) {
                            var key = keys.shift();
                            while (keys.constructor === Array && keys.length > 0) {
                                value[key] = value[key] || {};
                                return flattenKeys(keys, value[key]);
                            }
                            keyValue = (keyValue === '{}') ? {} : keyValue;
                            var arrayVal = isArray.exec(keyValue);
                            keyValue = arrayVal ? JSON.parse(arrayVal[1]) : keyValue;
                            value[key] = keyValue;
                        })(keySplit, value);
                    }
                }
            } else {
                value = (value === '{}') ? {} : value;
                var arrayVal = isArray.exec(value);
                value = arrayVal ? JSON.parse(arrayVal[1]) : value;
            }
            return value;
        },

        /**
          *  Set value for key
          *  Allows dot notation eg.:
          *  config.set('environment.api.basePath', 'http://someurl');
          */

        set: function (key, value) {
            key = (this.prefix) ? this.prefix + '.' + key : key;
            var storage = this.storage,
                isEmptyObject = this._isEmptyObject;
            (function expandKeys(key, value) {
                if (value && value.constructor === Array) {
                    value = 'Array(' + JSON.stringify(value) + ');';
                }
                else if (value === Object(value)) {
                    if (!isEmptyObject(value)) {
                        for (var _key in value) {
                            expandKeys(key + '.' + _key, value[_key]);
                        }
                        return;
                    } else {
                        value = '{}';
                    }
                }
                storage[key] = value;
            })(key, value);
        },

        /**
          *  Remove (delete) key and all sub keys
          *  all keys with prefix can be removed when key === prefix
          */

        remove: function (key) {
            if (this.prefix && key !== this.prefix) {
                key = this.prefix + ((key && key.length > 0) ? '.' + key : '');
            }
            var storage = this.storage;
            if (typeof storage[key] === 'undefined') {
                var _key;
                for (_key in storage) {
                    if (_key.indexOf(key + '.') === 0) {
                        delete storage[_key];
                    }
                }
            } else {
                delete storage[key];
            }
        },

        _isEmptyObject: function (obj) {
            var name;
            for (name in obj) return false;
            return true;
        }
    };

    return Config;
}));