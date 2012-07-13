var util   = require('util');

var cli = {};
cli.Logger = function() {
  this.__level = 4
};
cli.Logger.LEVEL_DEBUG = 4;
cli.Logger.LEVEL_INFO = 3;
cli.Logger.LEVEL_WARNING = 2;
cli.Logger.LEVEL_ERROR = 1;
cli.Logger.LEVEL_SILENT = 0;
cli.Logger.__getArgs = function(level, args) {
  return["[" + (new Date).toLocaleString().match(/[^\s]+/g).slice(1, 5).join(" ") + "]", "[" + level + "]:"].concat(Array.prototype.slice.call(args))
};
cli.Logger.prototype.setConsole = function(console) {
  console.debug = this.__debug.bind(this);
  console.info = this.__info.bind(this);
  console.warn = this.__warn.bind(this);
  console.error = this.__error.bind(this)
};
cli.Logger.prototype.setLevel = function(level) {
  this.__level = level
};
cli.Logger.prototype.__debug = function() {
  this.__level > 3 && console.log.apply(console, cli.Logger.__getArgs("DEBUG", arguments))
};
cli.Logger.prototype.__info = function() {
  this.__level > 2 && console.log.apply(console, cli.Logger.__getArgs("INFO", arguments))
};
cli.Logger.prototype.__warn = function() {
  this.__level > 1 && console.log.apply(console, cli.Logger.__getArgs("WARNING", arguments))
};
cli.Logger.prototype.__error = function() {
  this.__level > 0 && console.log.apply(console, cli.Logger.__getArgs("ERROR", arguments))
};

module.exports = cli;

