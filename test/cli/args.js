var util = require('../../bin');

console.log(util.args.getString('a'));
console.log(util.args.getArray('a'));
console.log(util.args.getString('b'));
console.log(util.args.getString('c'));
console.log(util.args.getBoolean('bool'));