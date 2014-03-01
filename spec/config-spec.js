//# spec/config-spec.js
var Config = require('../config');

describe('Basic test suite', function() {
    it('should have storage defined', function() {
        var config = new Config();
        expect(config.storage).toBeDefined();
    });

    it('should set value as string', function() {
        var config = new Config();
        config.set('foo', 'bar');
        expect(config.storage.foo).toBe('bar');
    });

    it('should set value as number', function() {
        var config = new Config();
        config.set('foo', 3.141592653589793);
        expect(config.storage.foo).toBe(3.141592653589793);
    });

    it('should set value as array', function() {
        var config = new Config();
        config.set('foo', ['bar', 'baz', 'buzz']);
        expect(config.get('foo')).toEqual(['bar', 'baz', 'buzz']);
    });

    it('should set value as object with nested array', function() {
        var config = new Config();
        var foo = {'bar': ['baz', 'buzz', 'ding', 'dong']};
        config.set('foo', foo);
        expect(config.get('foo')).toEqual(foo);
    });

    it('should set key with null object', function() {
        var config = new Config();
        config.set('foo', null);
        expect(config.storage.foo).toBeNull();
    });

    it('should set key with empty object', function() {
        var config = new Config();
        config.set('foo', {});
        expect(config.get('foo')).toEqual({});
    });

    it('should set key with empty object', function() {
        var config = new Config();
        config.set('foo', {bar: {}});
        expect(config.get('foo')).toEqual({bar: {}});
    });

    it('should set values using settings in constructor', function() {
        var config = new Config({}, {foo: 'bar'});
        expect(config.storage.foo).toBe('bar');
    });

    it('should get complex values using settings in constructor', function() {
        var config = new Config({}, {foo: {bar: 'baz'}});
        expect(config.get('foo.bar')).toBe('baz');
    });

    it('should set value using dot key semantics', function() {
        var config = new Config();
        var value = {};
        config.set('foo', {bar: 'baz'});
        expect(config.storage['foo.bar']).toBeDefined();
    });

    it('should return value using dot key semantics', function() {
        var config = new Config();
        var value = {};
        config.set('foo.bar', 'baz');
        expect(config.get('foo.bar')).toBe('baz');
    });

    it('should return object using dot key semantics', function() {
        var config = new Config();
        var value = {};
        config.set('foo.bar', 'baz');
        expect(config.get('foo')).toEqual({bar: 'baz'});
    });

    it('should return object set by dot key semantics', function() {
        var config = new Config();
        var value = {};
        config.set('foo.bar.baz', 'buzz');
        expect(config.get('foo')).toEqual({bar: {baz: 'buzz'}});
    });

    it('should return complex object for key', function() {
        var config = new Config();
        config.set('foo', {bar: {baz: 'buzz'}});
        expect(config.get('foo')).toEqual({bar: {baz: 'buzz'}});
    });

    it('should return undefined for partial key', function() {
        var config = new Config();
        var value = {};
        config.set('elephantWhichCrossedStreet', 'pink');
        expect(config.get('elephant')).toBeUndefined();
    });

    it('should return undefined for partial key dot semantics', function() {
        var config = new Config();
        var value = {};
        config.set('elephant.which.crossed.street', 'pink');
        expect(config.get('eleph')).toBeUndefined();
    });

    it('should return undefined for non existing key', function() {
        var config = new Config();
        expect(config.get('not_existing_key')).toBeUndefined();
    });

    it('should return remove key', function() {
        var config = new Config();
        config.set('foo', 'bar');
        expect(config.storage.foo).toBe('bar');
        config.remove('foo');
        expect(config.storage.foo).toBeUndefined();
    });

});