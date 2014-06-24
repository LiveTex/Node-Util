


/**
 * @constructor
 * @implements {util.obj.ICache}
 */
util.obj.Cache = function() {

  /**
   * @type {!Object}
   */
  this.__cache = {};
};


/**
 * @override
 */
util.obj.Cache.prototype.pull = function(key) {
  return this.__cache[key] || null;
};


/**
 * @override
 */
util.obj.Cache.prototype.stash = function(key, entity) {
  if (this.__cache[key] === undefined) {
    this.__cache[key] = entity;
  } else {
    console.warn('Duplicate ' + entity + ' stash for key "' + key + '".');
  }
};


/**
 * Очищение кеша.
 */
util.obj.Cache.prototype.flush = function() {
  this.__cache = {};
};
