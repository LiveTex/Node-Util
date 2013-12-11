var util = require('../../bin');
var path = require('path');

var filepath = function(filename) {
  return path.normalize(__dirname + '/' + filename);
};

var config = new util.Config();


var fp = filepath('base.json');
console.info('Base filepath: ' + fp);
config.load(fp);

console.info('BASE:');
console.info(config.getArray('database', 'redis', 'shards'));
console.info(config.getString('database', 'redis', 'shard_strategy'));
console.info(config.getString('database', 'cold_storage', 'type'));
console.info(config.getArray('database', 'redis', 'shards'));

fp = filepath('overlay1.json');
console.info('Overlay-1 filepath: ' + fp);
config.load(fp);

console.info('OVERLAY-1:');
console.info(config.getArray('database', 'redis', 'shards'));
console.info(config.getString('database', 'redis', 'shard_strategy'));
console.info(config.getString('database', 'cold_storage', 'type'));
console.info(config.getArray('database', 'redis', 'shards'));

fp = filepath('overlay2.json');
console.info('Overlay-2 filepath: ' + fp);
config.load(fp);

console.info('OVERLAY-2:');
console.info(config.getArray('database', 'redis', 'shards'));
console.info(config.getString('database', 'redis', 'shard_strategy'));
console.info(config.getString('database', 'cold_storage', 'type'));
console.info(config.getArray('database', 'redis', 'shards'));
