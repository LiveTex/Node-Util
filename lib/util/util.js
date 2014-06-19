

/**
 * @namespace
 */
util.arr = {};


/**
 * @namespace
 */
util.config = {};


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
util.hash = {};


/**
 * @namespace
 */
util.io = {};


/**
 * @namespace
 */
util.io.async = {};


/**
 * @namespace
 */
util.log = {};


/**
 * @namespace
 */
util.obj = {};


/**
 * @namespace
 */
util.uid = {};


/**
 * @namespace
 */
util.collector = {};


/**
 * @type {number}
 */
util.ENUM_SEED = Math.random();


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


/**
 * Removes whitespace from both sides of a string.
 *
 * @param {string} string String.
 * @return {string} Trimmed string.
 */
util.trim = function(string) {
  try {
    return string.trim();
  } catch (e) {
    return string.replace(/^\s+|\s+$/g, '');
  }
};


/**
 * @param {!Object} data Data.
 * @param {string} key Data key.
 * @return {string} String.
 */
util.extractString = function(data, key) {
  if (typeof data[key] === 'string') {
    return data[key];
  }

  return '';
};


/**
 * @param {!Object} data Data.
 * @param {string} key Data key.
 * @return {number} String.
 */
util.extractNumber = function(data, key) {
  if (typeof data[key] === 'number') {
    return data[key];
  }

  return 0;
};


/**
 * @param {!Object} data Data.
 * @param {string} key Data key.
 * @return {boolean} String.
 */
util.extractBoolean = function(data, key) {
  if (typeof data[key] === 'boolean') {
    return data[key];
  }

  return false;
};


/**
 * @param {!Object} data Data.
 * @param {string} key Data key.
 * @return {!Object} String.
 */
util.extractObject = function(data, key) {
  if (data[key] instanceof Object) {
    return data[key];
  }

  return {};
};
