


/**
 *
 *
 * @constructor
 * @param {!Object} data Source data.
 */
util.object.SafeObject = function(data) {

  /**
   * @type {!Object}
   */
  this.__core = data;
};


/**
 * Returns source data.
 *
 * @return {!Object} Source data.
 */
util.object.SafeObject.prototype.getCore = function() {
  return this.__core;
};


/**
 * Returns data.
 *
 * @param {...(string|number)} var_args Path to value.
 * @return {string|number|boolean|Object} Data.
 */
util.object.SafeObject.prototype.get = function(var_args) {
  return this.getByPath(Array.prototype.slice.call(arguments));
};


/**
 * Stores data to a key by its path.
 *
 * @param {string|number|boolean|Object} value Data.
 * @param {...(string|number)} var_args Path to value.
 */
util.object.SafeObject.prototype.set = function(value, var_args) {
  var path = Array.prototype.slice.call(arguments);
  this.setByPath(path.shift(), path);
};


/**
 * Returns data stored at key with certain path.
 *
 * @param {!Array.<(string|number)>} path Path to value.
 * @return {string|number|boolean|Object} Data.
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
 * Stores data to a key with certain path.
 *
 * @param {string|number|boolean|Object} value Data.
 * @param {!Array.<(string|number)>} path Path to value.
 */
util.object.SafeObject.prototype.setByPath = function(value, path) {
  var scope = this.__core;

  var i = 0,
      l = path.length;

  var key = null;
  while (i < l) {
    key = path[i++];

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
