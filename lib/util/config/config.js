

/**
 * @type {!util.obj.SafeObject}
 */
util.config.__safeCore = new util.obj.SafeObject({});


/**
 * @type {!Object}
 */
util.config.__core = {};


/**
 * @param {string} filename Путь к файлу с конфигом.
 */
util.config.load = function(filename) {
  try {
    var config = require(filename);
    util.config.__core = util.obj.merge(util.config.__core, config);
  } catch (error) {
    console.error('Unable to open config from file "' + filename +
        '". [util.config.load]');
  }

  util.config.__safeCore = new util.obj.SafeObject(util.config.__core);
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {string} Результат.
 */
util.config.getString = function(var_args) {
  var result = util.config.__safeCore.getByPath(util.arr.cast(arguments));
  if (result !== null) {
    return String(result);
  }

  return '';
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {number} Результат.
 */
util.config.getNumber = function(var_args) {
  var result = util.config.__safeCore.getByPath(util.arr.cast(arguments));
  if (result !== null) {
    return Number(result);
  }

  return 0;
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {boolean} Результат.
 */
util.config.getBoolean = function(var_args) {
  return !!util.config.__safeCore.getByPath(util.arr.cast(arguments));
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Object} Результат.
 */
util.config.getObject = function(var_args) {
  var result = util.config.__safeCore.getByPath(util.arr.cast(arguments));
  if (result instanceof Object) {
    return result;
  }

  return {};
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Array.<string>} Результат.
 */
util.config.getObjectKeys = function(var_args) {
  var obj = util.config.__safeCore.getByPath(util.arr.cast(arguments));
  var result = [];

  for (var key in obj) {
    result.push(key);
  }

  return result;
};


/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Array} Результат.
 */
util.config.getArray = function(var_args) {
  var result = util.config.__safeCore.getByPath(util.arr.cast(arguments));
  if (result instanceof Array) {
    return result;
  }

  return [];
};
