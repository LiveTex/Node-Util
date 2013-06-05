


/**
 * @constructor
 * @implements {util.uid.IIdGenerator}
 * @param {string} prefix Префикс.
 */
util.uid.PrefixIdGenerator = function(prefix) {

  /**
   * @type {string}
   */
  this.__prefix = prefix;

  /**
   * @type {number}
   */
  this.__counter = 0;
};


/**
 * @inheritDoc
 */
util.uid.PrefixIdGenerator.prototype.generateId = function() {
  return this.__prefix + (this.__counter += 1);
};
