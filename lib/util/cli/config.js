


/**
 * @constructor
 * @param {Object=} opt_data Данные.
 */
util.cli.Config = function(opt_data) {
  /**
   * @type {util.obj.SafeObject}
   */
  this.__safeCore = opt_data ? new util.obj.SafeObject(opt_data) : null;

  /**
   * @type {!Object}
   */
  this.__config = {};
};


/**
 * @param {string} filename Путь к файлу с конфигом.
 */
util.cli.Config.prototype.load = function(filename) {
  try {
    var config = require(filename);
    this.__config = util.obj.merge(this.__config, config);
  } catch (error) {
    console.error('Unable to open config file: ' + filename + '.');
  }

  this.__safeCore = new util.obj.SafeObject(this.__config);
};


/**
 * @param {!Array.<string>} configs Массив путей к файлам конфигов.
 */
util.cli.Config.prototype.multiLoad = function(configs) {
  var i = 0,
      l = configs.length;

  while (i < l) {
    this.load(configs[i]);
    i += 1;
  }
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {string} Результат.
 */
util.cli.Config.prototype.getString = function(var_args) {
  var result = this.__safeCore.getByPath(util.arr.cast(arguments));
  if (result !== null) {
    return String(result);
  }

  return '';
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {number} Результат.
 */
util.cli.Config.prototype.getNumber = function(var_args) {
  var result = this.__safeCore.getByPath(util.arr.cast(arguments));
  if (result !== null) {
    return Number(result);
  }

  return NaN;
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {boolean} Результат.
 */
util.cli.Config.prototype.getBoolean = function(var_args) {
  return !!this.__safeCore.getByPath(util.arr.cast(arguments));
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {Object} Результат.
 */
util.cli.Config.prototype.getObject = function(var_args) {
  var result = this.__safeCore.getByPath(util.arr.cast(arguments));
  if (result instanceof Object) {
    return result;
  }

  return null;
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Array.<string>} Результат.
 */
util.cli.Config.prototype.getObjectKeys = function(var_args) {
  var obj = this.__safeCore.getByPath(util.arr.cast(arguments));
  var result = [];

  if (typeof obj === 'object' && obj !== null) {
    for (var key in obj) {
      result.push(key);
    }
  }

  return result;
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Array} Результат.
 */
util.cli.Config.prototype.getArray = function(var_args) {
  var result = this.__safeCore.getByPath(util.arr.cast(arguments));
  if (result instanceof Array) {
    return result;
  }

  return [];
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!util.cli.Config} Конфиг.
 */
util.cli.Config.prototype.extract = function(var_args) {
  return new util.cli.Config(
      Object(this.__safeCore.getByPath(util.arr.cast(arguments))));
};


/**
 * @type {util.cli.Config}
 */
util.cli.Config.__instance = null;


/**
 * @return {!util.cli.Config} Единственный экземпляр.
 */
util.cli.Config.getInstance = function() {
  if (util.cli.Config.__instance === null) {
    util.cli.Config.__instance = new util.cli.Config();
  }

  return util.cli.Config.__instance;
};
