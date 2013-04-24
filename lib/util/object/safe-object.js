


/**
 * @constructor
 * @param {!Object} data Исходные данные.
 */
util.object.SafeObject = function(data) {

  /**
   * @type {!Object}
   */
  this.__core = data;
};


/**
 * @return {!Object} Исходные данные.
 */
util.object.SafeObject.prototype.getCore = function() {
  return this.__core;
};


/**
 * @param {...(string|number)} var_keys Путь к значению.
 * @return {string|number|boolean|Object} Данные.
 */
util.object.SafeObject.prototype.get = function(var_keys) {
  return this.getByPath(Array.prototype.slice.call(arguments));
};


/**
 * @param {string|number|boolean|Object} value Данные.
 * @param {...(string|number)} var_keys Путь к значению.
 */
util.object.SafeObject.prototype.set = function(value, var_keys) {
  var path = Array.prototype.slice.call(arguments);
  this.setByPath(path.shift(), path);
};


/**
 * @param {!Array.<(string|number)>} path Путь к значению.
 * @return {string|number|boolean|Object} Данные.
 */
util.object.SafeObject.prototype.getByPath = function(path) {
  var result = this.__core;

  var i = 0,
      l = path.length;

  var value = null;
  while (i < l) {
    if (result === null || path[i] === '') {
      break;
    }

    value = result[path[i]];
    if (value !== undefined) {
      result = value;
    } else {
      result = null;
    }

    i++;
  }

  return result;
};


/**
 * @param {string|number|boolean|Object} value Данные.
 * @param {!Array.<(string|number)>} path Путь к значению.
 */
util.object.SafeObject.prototype.setByPath = function(value, path) {
  var scope = this.__core;

  var i = 0,
      l = path.length;

  var key = null;
  while (i < l) {
    key = path[i += 1];

    if (key === '') {
      key = 0;

      while (scope[key] !== undefined) {
        key++;
      }
    }

    if (i === l) {
      scope[key] = value;
    } else if (scope[key] === undefined) {
      scope[key] = isNaN(path[i]) ? {} : [];
    }

    scope = scope[key];
  }
};


// Config methods


/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {string} Результат.
 */
util.object.SafeObject.prototype.getString = function(var_keys) {
  var result = this.__core.getByPath(util.toArray(arguments));
  if (result !== null) {
    return String(result);
  }
  return '';
};


/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {number} Результат.
 */
util.object.SafeObject.prototype.getNumber = function(var_keys) {
  var result = this.__core.getByPath(util.toArray(arguments));
  if (result !== null) {
    return Number(result);
  }
  return NaN;
};


/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {boolean} Результат.
 */
util.object.SafeObject.prototype.getBoolean = function(var_keys) {
  return !!this.__core.getByPath(util.toArray(arguments));
};


/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {Object} Результат.
 */
util.object.SafeObject.prototype.getObject = function(var_keys) {
  var result = this.__core.getByPath(util.toArray(arguments));
  if (typeof result === 'object') {
    return result;
  }
  return null;
};


/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {!Array} Результат.
 */
util.object.SafeObject.prototype.getArray = function(var_keys) {
  var result = this.__core.getByPath(util.toArray(arguments));
  if (result instanceof Array) {
    return result;
  }
  return [];
};
