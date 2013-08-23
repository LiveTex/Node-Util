


/**
 * @constructor
 */
cli.Config = function() {

  /**
   * @type {util.object.SafeObject}
   */
  this.__safeCore = null;

  /**
   * @type {!Object}
   */
  this.__config = {};
};


/**
 * @param {string} filename Путь к файлу с конфигом.
 */
cli.Config.prototype.load = function(filename) {
  try {
    var config = require(filename);
    this.__config = util.mergeRecursive(this.__config, config);
  } catch (error) {
    console.error('Unable to open config file: ' + filename + '.');
  }

  this.__safeCore = new util.object.SafeObject(this.__config);
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {string} Результат.
 */
cli.Config.prototype.getString = function(var_args) {
  var result = this.__safeCore.getByPath(util.toArray(arguments));
  if (result !== null) {
    return String(result);
  }

  return '';
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {number} Результат.
 */
cli.Config.prototype.getNumber = function(var_args) {
  var result = this.__safeCore.getByPath(util.toArray(arguments));
  if (result !== null) {
    return Number(result);
  }

  return NaN;
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {boolean} Результат.
 */
cli.Config.prototype.getBoolean = function(var_args) {
  return !!this.__safeCore.getByPath(util.toArray(arguments));
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {Object} Результат.
 */
cli.Config.prototype.getObject = function(var_args) {
  var result = this.__safeCore.getByPath(util.toArray(arguments));
  if (typeof result === 'object') {
    return result;
  }

  return null;
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Array} Результат.
 */
cli.Config.prototype.getArray = function(var_args) {
  var result = this.__safeCore.getByPath(util.toArray(arguments));
  if (result instanceof Array) {
    return result;
  }

  return [];
};


/**
 * @type {cli.Config}
 */
cli.Config.__instance = null;


/**
 * @return {!cli.Config} Единственный экземпляр.
 */
cli.Config.getInstance = function() {
  if (cli.Config.__instance === null) {
    cli.Config.__instance = new cli.Config();
  }

  return cli.Config.__instance;
};
