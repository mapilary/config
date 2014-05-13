//# spec/config-spec.js
var Config = require('../config');

describe('Basic test suite', function() {
    var prefix = 'mapilary';

    it('should have storage defined', function() {
        var config = new Config({prefix: prefix});
        expect(config.storage).toBeDefined();
    });

    it('should set value as string', function() {
        var config = new Config({prefix: prefix});
        config.set('foo', 'bar');
        expect(config.storage[prefix + '.' + 'foo']).toBe('bar');
    });

    it('should set value as number', function() {
        var config = new Config({prefix: prefix});
        config.set('foo', 3.141592653589793);
        expect(config.storage[prefix + '.' + 'foo']).toBe(3.141592653589793);
    });

    it('should set value as array', function() {
        var config = new Config({prefix: prefix});
        config.set('foo', ['bar', 'baz', 'buzz']);
        expect(config.get('foo')).toEqual(['bar', 'baz', 'buzz']);
    });

    it('should set value as object with nested array', function() {
        var config = new Config({prefix: prefix});
        var foo = {'bar': ['baz', 'buzz', 'ding', 'dong']};
        config.set('foo', foo);
        expect(config.get('foo')).toEqual(foo);
    });

    it('should set key with null object', function() {
        var config = new Config({prefix: prefix});
        config.set('foo', null);
        expect(config.storage[prefix + '.' + 'foo']).toBeNull();
    });

    it('should set key with empty object', function() {
        var config = new Config({prefix: prefix});
        config.set('foo', {});
        expect(config.get('foo')).toEqual({});
    });

    it('should set key with empty object', function() {
        var config = new Config({prefix: prefix});
        config.set('foo', {bar: {}});
        expect(config.get('foo')).toEqual({bar: {}});
    });

    it('should set values using settings in constructor', function() {
        var config = new Config({prefix: prefix}, {foo: 'bar'});
        expect(config.storage[prefix + '.' + 'foo']).toBe('bar');
    });

    it('should get complex values using settings in constructor', function() {
        var config = new Config({prefix: prefix}, {foo: {bar: 'baz'}});
        expect(config.get('foo.bar')).toBe('baz');
    });

    it('should set value using dot key semantics', function() {
        var config = new Config({prefix: prefix});
        config.set('foo', {bar: 'baz'});
        expect(config.storage[prefix + '.' + 'foo.bar']).toBeDefined();
    });

    it('should return value using dot key semantics', function() {
        var config = new Config({prefix: prefix});
        config.set('foo.bar', 'baz');
        expect(config.get('foo.bar')).toBe('baz');
    });

    it('should return object using dot key semantics', function() {
        var config = new Config({prefix: prefix});
        config.set('foo.bar', 'baz');
        expect(config.get('foo')).toEqual({bar: 'baz'});
    });

    it('should return object set by dot key semantics', function() {
        var config = new Config({prefix: prefix});
        config.set('foo.bar.baz', 'buzz');
        expect(config.get('foo')).toEqual({bar: {baz: 'buzz'}});
    });

    it('should return complex object for key', function() {
        var config = new Config({prefix: prefix});
        config.set('foo', {bar: {baz: 'buzz'}});
        expect(config.get('foo')).toEqual({bar: {baz: 'buzz'}});
    });

    it('should return undefined for partial key', function() {
        var config = new Config({prefix: prefix});
        config.set('elephantWhichCrossedStreet', 'pink');
        expect(config.get('elephant')).toBeUndefined();
    });

    it('should return undefined for partial key dot semantics', function() {
        var config = new Config({prefix: prefix});
        config.set('elephant.which.crossed.street', 'pink');
        expect(config.get('eleph')).toBeUndefined();
    });

    it('should return undefined for non existing key', function() {
        var config = new Config({prefix: prefix});
        expect(config.get('not_existing_key')).toBeUndefined();
    });

    it('should return all keys with prefix when key is not provided', function() {
        var storage = {globalKey: 'should not be seen'};
        var config = new Config({storage: storage, prefix: prefix});
        config.set('foo', {bar: {baz: 'buzz'}});
        expect(config.storage).toEqual({
            'globalKey': 'should not be seen',
            'mapilary.foo.bar.baz': 'buzz'
        });
        expect(config.get()).toEqual({foo: {bar: {baz: 'buzz'}}});
    });

    it('should return undefined for removed key', function() {
        var config = new Config({prefix: prefix});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo');
        expect(config.storage[prefix + '.' + 'foo']).toBeUndefined();
    });

    it('should return remove nested keys', function() {
        var config = new Config({prefix: prefix});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo.bar');
        expect(config.get()).toEqual({foo: {baz: 'buzz'}});
    });

    it('should remove sub key', function() {
        var config = new Config({prefix: prefix});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo.bar');
        expect(config.get()).toEqual({foo: {baz: 'buzz'}});
    });

    it('should remove all keys with prefix', function() {
        var config = new Config({prefix: prefix});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove(prefix);
        expect(config.storage).toEqual({});
    });

});