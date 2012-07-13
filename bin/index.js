var util   = require('util');

var cli = {};
cli.Logger = function() {
  this.__level = cli.Logger.LEVEL_INFO
};
cli.Logger.LEVEL_INFO = 3;
cli.Logger.LEVEL_WARNING = 2;
cli.Logger.LEVEL_ERROR = 1;
cli.Logger.LEVEL_SILENT = 0;
cli.Logger.__getArgs = function(level, args) {
  return["[" + (new Date).toLocaleString().match(/[^\s]+/g).slice(1, 5).join(" ") + "]", "[" + level + "]:"].concat(Array.prototype.slice.call(args))
};
cli.Logger.prototype.setConsole = function(console) {
  console.info = this.__info.bind(this);
  console.warn = this.__warn.bind(this);
  console.error = this.__error.bind(this)
};
cli.Logger.prototype.setLevel = function(level) {
  this.__level = level
};
cli.Logger.prototype.getLevel = function() {
  return this.__level
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
cli.Arguments = function() {
  this.__map = {};
  this.__currentArg = ""
};
cli.Arguments.prototype.registerValue = function(name) {
  this.__map[name] = []
};
cli.Arguments.prototype.extractValues = function(agrv) {
  var args = agrv.join(" ").replace(/=/g, " ").split(" ").concat("");
  while(args.length > 0) {
    this.__applyArgument(args.shift())
  }
};
cli.Arguments.prototype.getArray = function(name) {
  if(this.__map[name] !== undefined) {
    return this.__map[name].slice(0)
  }
  return null
};
cli.Arguments.prototype.getString = function(name) {
  if(this.__map[name] !== undefined && this.__map[name][0] !== undefined) {
    return this.__map[name][0]
  }
  return""
};
cli.Arguments.prototype.getNumber = function(name) {
  if(this.__map[name] !== undefined && this.__map[name][0] !== undefined) {
    return Number(this.__map[name][0])
  }
  return NaN
};
cli.Arguments.prototype.getBoolean = function(name) {
  return this.__map[name] !== undefined && this.__map[name].length > 0
};
cli.Arguments.prototype.__applyArgument = function(arg) {
  var value = "";
  var newArg = "";
  if(arg.indexOf("--") === 0) {
    var name = arg.substr(2);
    if(this.__map[name] !== undefined) {
      newArg = name
    }
  }else {
    value = arg
  }
  if(this.__currentArg !== "") {
    this.__map[this.__currentArg].push(value);
    this.__currentArg = ""
  }
  if(newArg !== "") {
    this.__currentArg = newArg
  }
};

module.exports = cli;

