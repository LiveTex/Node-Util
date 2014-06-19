


/**
 * @constructor
 * @implements {util.io.ICache}
 */
util.io.Cache = function() {

  /**
   * @type {!Object.<util.io.Entity, util.io.Entity>}
   */
  this.__cache = {};
};


/**
 * @override
 */
util.io.Cache.prototype.pullEntity = function(key) {
  return this.__cache[key] || null;
};


/**
 * @override
 */
util.io.Cache.prototype.stashEntity = function(key, entity) {
  if (this.__cache[key] === undefined) {
    this.__cache[key] = entity;
  } else {
    console.warn('Duplicate ' + entity + ' stash for key "' + key + '".');
  }
};


/**
 * Очищение кеша.
 */
util.io.Cache.prototype.flush = function() {
  this.__cache = {};
};
