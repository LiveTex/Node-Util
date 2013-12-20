


/**
 * @constructor
 * @implements {util.ISafeObject}
 * @param {!Object} data Source data.
 */
util.SafeObject = function(data) {

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
util.SafeObject.prototype.getCore = function() {
  return this.__core;
};


/**
 * @inheritDoc
 */
util.SafeObject.prototype.get = function(var_args) {
  return this.getByPath(Array.prototype.slice.call(arguments));
};


/**
 * @inheritDoc
 */
util.SafeObject.prototype.set = function(value, var_args) {
  var path = Array.prototype.slice.call(arguments);
  this.setByPath(path.shift(), path);
};


/**
 * @inheritDoc
 */
util.SafeObject.prototype.getByPath = function(path) {
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
util.SafeObject.prototype.setByPath = function(value, path) {
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
