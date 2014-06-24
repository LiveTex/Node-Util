


/**
 * @interface
 */
util.obj.ICache = function() {};


/**
 * @param {string} key Ключ хранения.
 * @return {*} Сушность.
 */
util.obj.ICache.prototype.pull = function(key) {};


/**
 * @param {string} key Ключ хранения.
 * @param {*} entity Cущность.
 */
util.obj.ICache.prototype.stash = function(key, entity) {};
