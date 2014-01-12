

/**
 * @namespace
 */
util.arr = {};


/**
 * @namespace
 */
util.cli = {};


/**
 * @namespace
 */
util.fn = {};


/**
 * @namespace
 */
util.format = {};


/**
 * @namespace
 */
util.hash = {};


/**
 * @namespace
 */
util.obj = {};


/**
 * @namespace
 */
util.uid = {};


/**
 * Clones an object
 *
 * @param {*} value Value to clone.
 * @return {*} Copy of an object.
 */
util.clone = function(value) {
  if (value instanceof Object) {
    return util.obj.clone(value);
  }

  return value;
};


/**
 * Compares two objects
 *
 * @param {*} first Object to compare.
 * @param {*} second Object to compare.
 * @return {boolean} Result of comparison.
 */
util.equals = function(first, second) {
  if (first === second) {
    return true;
  } else if (first instanceof Object && second instanceof Object) {
    return util.obj.equals(first, second);
  }

  return false;
};
