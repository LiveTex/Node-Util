


/**
 * @constructor
 * @implements {util.obj.ISafeObject}
 * @param {!Object} data Source data.
 */
util.obj.SafeObject = function(data) {

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
util.obj.SafeObject.prototype.getCore = function() {
  return this.__core;
};


/**
 * @param {...(string|number)} var_args Path to value.
 * @return {*} Data.
 */
util.obj.SafeObject.prototype.get = function(var_args) {
  return this.getByPath(Array.prototype.slice.call(arguments));
};


/**
 * @param {*} value Data.
 * @param {...(string|number)} var_args Path to value.
 */
util.obj.SafeObject.prototype.set = function(value, var_args) {
  var path = Array.prototype.slice.call(arguments);
  this.setByPath(path.shift(), path);
};


/**
 * @inheritDoc
 */
util.obj.SafeObject.prototype.getByPath = function(path) {
  var result = this.__core;

  var i = 0,
      l = path.length;

  while (i < l) {
    if (result === null || path[i] === '') {
      break;
    }

    var value = result[path[i]];
    if (value !== undefined) {
      result = value;
    } else {
      result = null;
    }

    i += 1;
  }

  return result;
};


/**
 * @inheritDoc
 */
util.obj.SafeObject.prototype.setByPath = function(value, path) {
  var scope = this.__core;

  var i = 0,
      l = path.length;

  while (i < l) {
    var key = path[i];

    if (key === '') {
      key = 0;

      while (scope[key] !== undefined) {
        key += 1;
      }
    }

    i += 1;

    if (i === l) {
      scope[key] = value;
    } else if (scope[key] === undefined) {
      scope[key] = isNaN(path[i]) ? {} : [];
    }

    scope = scope[key];
  }
};


/**
 * @param {...string} var_args
 * @return {string}
 */
util.obj.SafeObject.prototype.getString = function(var_args) {
  var value = this.getByPath(Array.prototype.slice.call(arguments));

  if (typeof value === 'string') {
    return value;
  }

  return '';
};


/**
 * @param {...string} var_args
 * @return {number}
 */
util.obj.SafeObject.prototype.getNumber = function(var_args) {
  var value = this.getByPath(Array.prototype.slice.call(arguments));

  if (typeof value === 'number') {
    return value;
  }

  return 0;
};


/**
 * @param {...string} var_args
 * @return {boolean}
 */
util.obj.SafeObject.prototype.getBoolean = function(var_args) {
  var value = this.getByPath(Array.prototype.slice.call(arguments));

  if (typeof value === 'boolean') {
    return value;
  }

  return false;
};


/**
 * @param {...string} var_args
 * @return {!Object}
 */
util.obj.SafeObject.prototype.getObject = function(var_args) {
  var value = this.getByPath(Array.prototype.slice.call(arguments));

  if (value instanceof Object) {
    return value;
  }

  return {};
};
