

/**
 * Creates a key-value table.
 *
 * @param {!Array.<string>} keys Keys for a table.
 * @param {!Array} values Values for a table.
 * @return {!Object} Table.
 */
util.obj.glue = function(keys, values) {
  var result = {};
  var i = 0,
      l = keys.length;
  while (i < l) {
    result[keys[i]] = values[i];
    i += 1;
  }
  return result;
};


/**
 * Creates an safe object
 *
 * @param {Object} obj Object.
 * @return {!util.obj.SafeObject} Safe object.
 */
util.obj.safe = function(obj) {
  return new util.obj.SafeObject(obj || {});
};


/**
 * Clones an object
 *
 * @param {!Object} value Value to clone.
 * @return {!Object} Copy of an object.
 */
util.obj.clone = function(value) {
  var clone = new value.constructor();

  for (var param in value) {
    clone[param] = util.clone(value[param]);
  }

  return clone;
};


/**
 * Merges two objects.
 *
 * @param {!Object} base Base object to merge.
 * @param {!Object} target Object to merge with base object.
 * @return {!Object} Result of merging.
 */
util.obj.merge = function(base, target) {
  for (var key in target) {
    if (base[key] instanceof Object &&
        target[key] instanceof Object) {

      base[key] = util.obj.merge(base[key], target[key]);
    } else {
      base[key] = target[key];
    }
  }

  return base;
};


/**
 * Compares two objects
 *
 * @param {!Object} first Object to compare.
 * @param {!Object} second Object to compare.
 * @return {boolean} Result of comparison.
 */
util.obj.equals = function(first, second) {
  for (var param in first) {
    if (!util.equals(first[param], second[param])) {
      return false;
    }
  }

  return true;
};


