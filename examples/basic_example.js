//# assuming node environment

var Config = require('../config.js');


var settings = {foo: {bar: {baz: 'buzz'}}};
var config = new Config({}, settings);
console.log(config.get('foo.bar.baz')); // returns buzz
console.log(config.get('foo')); // returns {bar: {baz: 'buzz'}}
console.log(config.get()); // returns {foo: {bar: {baz: 'buzz'}}}
