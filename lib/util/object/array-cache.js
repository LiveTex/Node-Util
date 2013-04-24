


/**
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
 * @param {string} key Ключ.
 * @return {!Array} Данные.
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
 * @param {string} key Ключ.
 * @param {!Array} data Данные.
 * @param {number} timeout Ключ.
 */
util.object.ArrayCache.prototype.set = function(key, data, timeout) {
  if (timeout > 0) {
    this.__data[key] = data;
    this.__expires[key] = Date.now() + timeout;
  }
};


/**
 * @param {string} key Ключ поля.
 */
util.object.ArrayCache.prototype.remove = function(key) {
  delete this.__expires[key];
  delete this.__data[key];
};


/**
 * @param {string} key Ключ поля.
 * @return {boolean} Наличие ключа.
 */
util.object.ArrayCache.prototype.has = function(key) {
  return this.ttl(key) > 0;
};


/**
 * @param {string} key Ключ поля.
 * @return {number} Время жизни ключа.
 */
util.object.ArrayCache.prototype.ttl = function(key) {
  if (this.__expires[key] !== undefined) {
    return this.__expires[key] - Date.now();
  }

  return 0;
};
