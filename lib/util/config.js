


/**
 * @constructor
 * @param {Object=} opt_data Данные.
 */
util.Config = function(opt_data) {
  /**
   * @type {util.SafeObject}
   */
  this.__safeCore = opt_data ? new util.SafeObject(opt_data) : null;

  /**
   * @type {!Object}
   */
  this.__config = {};
};


/**
 * @param {string} filename Путь к файлу с конфигом.
 */
util.Config.prototype.load = function(filename) {
  try {
    var config = require(filename);
    this.__config = util.mergeRecursive(this.__config, config);
  } catch (error) {
    console.error('Unable to open config file: ' + filename + '.');
  }

  this.__safeCore = new util.SafeObject(this.__config);
};


/**
 * @param {!Array.<string>} configs Массив путей к файлам конфигов.
 */
util.Config.prototype.multiLoad = function(configs) {
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
util.Config.prototype.getString = function(var_args) {
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
util.Config.prototype.getNumber = function(var_args) {
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
util.Config.prototype.getBoolean = function(var_args) {
  return !!this.__safeCore.getByPath(util.toArray(arguments));
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {Object} Результат.
 */
util.Config.prototype.getObject = function(var_args) {
  var result = this.__safeCore.getByPath(util.toArray(arguments));
  if (result instanceof Object) {
    return result;
  }

  return null;
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Array.<string>} Результат.
 */
util.Config.prototype.getObjectKeys = function(var_args) {
  var obj = this.__safeCore.getByPath(util.toArray(arguments));
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
util.Config.prototype.getArray = function(var_args) {
  var result = this.__safeCore.getByPath(util.toArray(arguments));
  if (result instanceof Array) {
    return result;
  }

  return [];
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!util.Config} Конфиг.
 */
util.Config.prototype.extract = function(var_args) {
  return new util.Config(
      Object(this.__safeCore.getByPath(util.toArray(arguments))));
};


/**
 * @type {util.Config}
 */
util.Config.__instance = null;


/**
 * @return {!util.Config} Единственный экземпляр.
 */
util.Config.getInstance = function() {
  if (util.Config.__instance === null) {
    util.Config.__instance = new util.Config();
  }

  return util.Config.__instance;
};
