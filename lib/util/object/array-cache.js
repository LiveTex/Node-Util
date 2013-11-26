


/**
 *
 *
 * @constructor
 */
util.object.ArrayCache = function() {

  /**
   * @type {!Object.<string, !Array>}
   */
  this.__data = {};

  /**
   * @type {!Object.<string, number>}
   */
  this.__expires = {};
};


/**
 * Returns data stored at key.
 *
 * @param {string} key Key.
 * @return {!Array} Data.
 */
util.object.ArrayCache.prototype.get = function(key) {
  if (this.__data[key] !== undefined) {
    var ttl = this.ttl(key);
    if (ttl <= 0) {
      this.remove(key);
    } else {
      return this.__data[key];
    }
  }

  return [];
};


/**
 * Stores data to key with timeout.
 *
 * @param {string} key Key.
 * @param {!Array} data Data to store.
 * @param {number} timeout Time to delay.
 */
util.object.ArrayCache.prototype.set = function(key, data, timeout) {
  if (timeout > 0) {
    this.__data[key] = data;
    this.__expires[key] = Date.now() + timeout;
  }
};


/**
 * Removes data from object by key.
 *
 * @param {string} key Key to remove.
 */
util.object.ArrayCache.prototype.remove = function(key) {
  delete this.__expires[key];
  delete this.__data[key];
};


/**
 * Checks whether the object has a key or not.
 *
 * @param {string} key Key.
 * @return {boolean} Result of the check.
 */
util.object.ArrayCache.prototype.has = function(key) {
  return this.ttl(key) > 0;
};


/**
 * Returns time of key life.
 *
 * @param {string} key Key.
 * @return {number} Time to life.
 */
util.object.ArrayCache.prototype.ttl = function(key) {
  if (this.__expires[key] !== undefined) {
    return this.__expires[key] - Date.now();
  }

  return 0;
};


/**
 * Returns a number of objects.
 *
 * @return {number} Quantity.
 */
util.object.ArrayCache.prototype.getAmount = function() {
  return Object.keys(this.__data).length;
};
