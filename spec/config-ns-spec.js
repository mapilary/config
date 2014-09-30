//# spec/config-spec.js
var Config = require('../config');

describe('Namespace test suite', function() {

    it('should have storage defined', function() {
        var config = new Config({namespace: 'mapilary'});
        expect(config.storage).toBeDefined();
    });

    it('should set value as string', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo', 'bar');
        expect(config.storage['mapilary.foo']).toBeDefined();
        expect(config.get('foo')).toBe('bar');
    });

    it('should set value as number', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo', 3.141592653589793);
        expect(config.storage['mapilary.foo']).toBeDefined();
        expect(config.get('foo')).toBe(3.141592653589793);
    });

    it('should set value as array', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo', ['bar', 'baz', 'buzz']);
        expect(config.get('foo')).toEqual(['bar', 'baz', 'buzz']);
    });

    it('should set value as object with nested array', function() {
        var config = new Config({namespace: 'mapilary'});
        var foo = {'bar': ['baz', 'buzz', 'ding', 'dong']};
        config.set('foo', foo);
        expect(config.get('foo')).toEqual(foo);
    });

    it('should set key with null object', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo', null);
        expect(config.storage['mapilary.foo']).toBeDefined();
        expect(config.get('foo')).toBeNull();
    });

    it('should set key with empty object', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo', {});
        expect(config.get('foo')).toEqual({});
    });

    it('should set key with empty object', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo', {bar: {}});
        expect(config.get('foo')).toEqual({bar: {}});
    });

    it('should set keys from constructor', function() {
        var config = new Config({namespace: 'mapilary'}, {foo: 'bar'});
        expect(config.storage['mapilary.foo']).toBeDefined();
        expect(config.get('foo')).toBe('bar');
    });

    it('should return value set by constructor', function() {
        var config = new Config({namespace: 'mapilary'}, {foo: {bar: 'baz'}});
        expect(config.get('foo.bar')).toBe('baz');
    });

    it('should set value using dot key semantics', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo', {bar: 'baz'});
        expect(config.storage['mapilary.foo.bar']).toBeDefined();
    });

    it('should set object', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set({foo: {bar: 'baz'}});
        expect(config.get()).toEqual({foo: {bar: 'baz'}});
    });

    it('should return value using dot key semantics', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo.bar', 'baz');
        expect(config.get('foo.bar')).toBe('baz');
    });

    it('should return object using dot key semantics', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo.bar', 'baz');
        expect(config.get('foo')).toEqual({bar: 'baz'});
    });

    it('should return object set by dot key semantics', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo.bar.baz', 'buzz');
        expect(config.get('foo')).toEqual({bar: {baz: 'buzz'}});
    });

    it('should return complex object for key', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo', {bar: {baz: 'buzz'}});
        expect(config.get('foo')).toEqual({bar: {baz: 'buzz'}});
    });

    it('should return undefined for partial key', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('elephantWhichCrossedStreet', 'pink');
        expect(config.get('elephant')).toBeUndefined();
    });

    it('should return undefined for partial key dot semantics', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('elephant.which.crossed.street', 'pink');
        expect(config.get('eleph')).toBeUndefined();
    });

    it('should return undefined for non existing key', function() {
        var config = new Config({namespace: 'mapilary'});
        expect(config.get('not_existing_key')).toBeUndefined();
    });

    it('should return all keys within namespace', function() {
        var storage = {globalKey: 'should not be seen'};
        var config = new Config({storage: storage, namespace: 'mapilary'});
        config.set('foo', {bar: {baz: 'buzz'}});
        expect(config.storage).toEqual({
            'globalKey': 'should not be seen',
            'mapilary.foo.bar.baz': '"buzz"'
        });
        expect(config.get()).toEqual({foo: {bar: {baz: 'buzz'}}});
    });

    it('should return undefined for removed key', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo');
        expect(config.get('foo')).toBeUndefined();
        expect(config.storage).toEqual({});
    });

    it('should remove sub key', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo.bar');
        expect(config.get()).toEqual({foo: {baz: 'buzz'}});
    });

    it('should remove sibling key', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('bar', 'buz');
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('foo');
        expect(config.get()).toEqual({bar: 'buz'});
        expect(config.storage['mapilary.bar']).toBeDefined();
    });

    // @deprecated
    it('should remove all keys within namespace', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove('mapilary');
        expect(config.storage).toEqual({});
    });

    it('should remove all keys within namespace', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.clear();
        expect(config.storage).toEqual({});
    });

    it('should not remove any key within namespace', function() {
        var config = new Config({namespace: 'mapilary'});
        config.set('foo.bar', 'buz');
        config.set('foo.baz', 'buzz');
        config.remove();
        expect(config.storage['mapilary.foo.bar']).toBeDefined();
        expect(config.storage['mapilary.foo.baz']).toBeDefined();
    });

    it('should not remove any key within different namespace', function() {
        var storage = {};
        var config1 = new Config({storage: storage, namespace: 'ns1'});
        var config2 = new Config({storage: storage, namespace: 'ns2'});
        config1.set('foo.bar', 'buz');
        config2.set('foo.bar', 'buz');
        expect(storage).toEqual({'ns1.foo.bar': '"buz"', 'ns2.foo.bar': '"buz"'});
        config2.remove('ns2');
        expect(storage).toEqual({'ns1.foo.bar': '"buz"'});
        expect(config1.get('foo')).toEqual({bar: 'buz'});
    });

    it('should set value in nested namespace', function() {
        var config = new Config({namespace: 'mapilary.courier'});
        config.set('foo', 'bar');
        expect(config.storage['mapilary.courier' + '.' + 'foo']).toBeDefined();
        expect(config.get('foo')).toBe('bar');
    });

    it('should get object from nested namespace', function() {
        var config = new Config({namespace: 'mapilary.courier'});
        config.set('foo', 'bar');
        expect(config.get()).toEqual({foo: 'bar'});
    });
});