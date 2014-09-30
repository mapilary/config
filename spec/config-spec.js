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
        expect(config.get('foo')).toBe('bar');
    });

    it('should set value as number', function() {
        var config = new Config();
        config.set('foo', 3.141592653589793);
        expect(config.get('foo')).toBe(3.141592653589793);
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
        expect(config.storage['foo']).toBeDefined();
        expect(config.get('foo')).toBeNull();
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

    it('should set keys from constructor', function() {
        var config = new Config({}, {foo: 'bar'});
        expect(config.get('foo')).toBe('bar');
    });

    it('should return value set by constructor', function() {
        var config = new Config({}, {foo: {bar: 'baz'}});
        expect(config.get('foo.bar')).toBe('baz');
    });

    it('should set value using dot key semantics', function() {
        var config = new Config();
        config.set('foo', {bar: 'baz'});
        expect(config.storage['foo.bar']).toBeDefined();
    });

    it('should return all keys', function() {
        var config = new Config();
        config.set('foo.bar', 'baz');
        config.set('bar.bar', 'baz');
        expect(config.get()).toEqual({foo: {bar: 'baz'}, bar: {bar: 'baz'}});
    });

    it('should return value using dot key semantics', function() {
        var config = new Config();
        config.set('foo.bar', 'baz');
        expect(config.get('foo.bar')).toBe('baz');
    });

    it('should return object using dot key semantics', function() {
        var config = new Config();
        config.set('foo.bar', 'baz');
        expect(config.get('foo')).toEqual({bar: 'baz'});
    });

    it('should return object set by dot key semantics', function() {
        var config = new Config();
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
        config.set('elephantWhichCrossedStreet', 'pink');
        expect(config.get('elephant')).toBeUndefined();
    });

    it('should return undefined for partial key dot semantics', function() {
        var config = new Config();
        config.set('elephant.which.crossed.street', 'pink');
        expect(config.get('eleph')).toBeUndefined();
    });

    it('should return undefined for non existing key', function() {
        var config = new Config();
        expect(config.get('not_existing_key')).toBeUndefined();
    });

    it('should return undefined for removed key', function() {
        var config = new Config();
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo');
        expect(config.get('foo')).toBeUndefined();
        expect(config.storage).toEqual({});
    });

    it('should remove sub key', function() {
        var config = new Config();
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo.bar');
        expect(config.get('foo')).toEqual({baz: 'buzz'});
    });

    it('should not remove any key', function() {
        var config = new Config();
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove();
        expect(config.get()).toEqual({foo: {bar: 'buz', baz: 'buzz'}});
    });

    it('should not remove sibling key', function() {
        var config = new Config();
        config.set('bar', 'buz');
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo');
        expect(config.get()).toEqual({bar: 'buz'});
    });

    it('should remove all keys', function() {
        var config = new Config();
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.clear();
        expect(config.storage).toEqual({});
    });
});