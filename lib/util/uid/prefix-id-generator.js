


/**
 * @constructor
 * @implements {util.uid.IIdGenerator}
 * @param {string} prefix Префикс.
 * @param {boolean=} opt_isIncremental Использовать ли инкремент.
 */
util.uid.PrefixIdGenerator = function(prefix, opt_isIncremental) {

  /**
   * @type {string}
   */
  this.__prefix = prefix;

  /**
   * @type {number}
   */
  this.__counter = 0;

  /**
   * @type {boolean}
   */
  this.__isIncremental =
      opt_isIncremental === undefined ? true : opt_isIncremental;
};


/**
 * @inheritDoc
 */
util.uid.PrefixIdGenerator.prototype.generateId = function() {
  if (this.__isIncremental) {
    return this.__prefix + (this.__counter += 1);
  }

  return this.__prefix + Math.random().toString(36).substr(2);
};


/**
 * @return {string} Префикс.
 */
util.uid.PrefixIdGenerator.prototype.getPrefix = function() {
  return this.__prefix;
};