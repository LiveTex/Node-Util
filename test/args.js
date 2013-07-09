var cli = require('../bin');

cli.args.registerValue('a');
cli.args.registerValue('b');

cli.args.extractValues(process.argv);

console.log(cli.args.getString('a'));
console.log(cli.args.getString('b'));

