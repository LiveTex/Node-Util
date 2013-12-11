var cli = require('../bin');

cli.args.extractValues(process.argv);

console.log(cli.args.getString('a'));
console.log(cli.args.getString('b'));
console.log(cli.args.getString('c'));
