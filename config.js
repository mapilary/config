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

    var Config = function (storage, settings) {
        this.storage = storage || {};
        if (settings) {
            for (var key in settings) {
                this.set(key, settings[key]);
            }
        }
    };

    Config.prototype = {

        /**
          *  Allows dot notation eg.:
          *  Config.get('environment.api.basePath');
          */

        get: function (key) {
            var storage = this.storage,
                value   = storage[key],
                isArray = new RegExp('^Array\\((.*)\\);');
            if (typeof value === 'undefined') {
                var _key;
                //recursively search for key
                for (_key in storage) {
                    if (_key.indexOf(key + '.') === 0) {
                        value = value || {};
                        var keyValue = storage[_key];
                        var __key = _key.substr((key.length > 0) ? key.length + 1 : 0);
                        var keySplit = __key.split('.');
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

        set: function (key, value) {
            var storage = this.storage;
            var isEmptyObject = this._isEmptyObject;
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

        remove: function (key) {
            delete this.storage[key];
        },

        _isEmptyObject: function (obj) {
            var name;
            for (name in obj) return false;
            return true;
        }
    };

    return Config;
}));