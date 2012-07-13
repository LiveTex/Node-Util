var cli = require('../bin');


var args = new cli.Arguments();
args.registerValue('hello_1');
args.registerValue('hello_2');
args.extractValues(process.argv);

console.log(
  args.getArray('hello_1'),
  args.getString('hello_1'),
  args.getNumber('hello_1'),
  args.getBoolean('hello_1')
);

