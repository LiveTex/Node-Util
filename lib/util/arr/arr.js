

/**
 * Creates array of unique strings..
 *
 * @param {!Array.<string>} set Array of strings.
 * @return {!Array.<string>} Array of unique strings.
 */
util.arr.unique = function(set) {
  var result = {};
  for (var i = 0, l = set.length; i < l; i += 1) {
    result[set[i]] = true;
  }

  return Object.keys(result) || [];
};


/**
 * Fills array with data.
 *
 * @param {!Array.<*>} array Array to fill.
 * @param {*} value Data.
 * @return {!Array.<*>} Filled array.
 */
util.arr.fill = function(array, value) {
  var i = 0,
      l = array.length;

  while (i < l) {
    array[i] = value;

    i += 1;
  }

  return array;
};


/**
 * Creates an array.
 *
 * @param {number} length Size of array.
 * @param {*=} opt_defaultValue Default value to set for each element of array.
 * @return {!Array.<*>} Array.
 */
util.arr.create = function(length, opt_defaultValue) {
  return util.fill(new Array(length),
      opt_defaultValue !== undefined ? opt_defaultValue : null);
};


/**
 * Clones an array
 *
 * @param {!Array} array Array o clone.
 * @return {!Array} Copy of the array.
 */
util.arr.clone = function(array) {
  return array.slice(0);
};


/**
 * Converts object to array.
 *
 * @param {{length: number}} list Object resembles an array.
 * @return {!Array} Array.
 */
util.arr.cast = function(list) {
  if (list instanceof Object) {
    return Array.prototype.slice.call(list);
  }

  return [];
};


/**
 * Converts each element of an array to string.
 *
 * @param {{length: number}} list Object resembles an array.
 * @return {!Array.<string>} array of strings.
 */
util.arr.castString = function(list) {
  var i = 0,
      l = list.length;

  var result = new Array(l);
  while (i < l) {
    if (typeof list[i] === 'string') {
      result[i] = list[i];
    } else {
      result[i] = String(list[i]);
    }

    i += 1;
  }

  return result;
};


/**
 * Converts each element of an array to object
 *
 * @param {{length: number}} list Object resembles an array.
 * @return {!Array.<!Object>} Array of objects.
 */
util.arr.castObject = function(list) {
  var i = 0,
      l = list.length;

  var result = new Array(l);
  while (i < l) {
    if (list[i] instanceof Object) {
      result[i] = list[i];
    } else {
      result[i] = Object(list[i]);
    }

    i += 1;
  }

  return result;
};
