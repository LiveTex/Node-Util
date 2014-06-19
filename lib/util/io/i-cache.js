


/**
 * @interface
 */
util.io.ICache = function() {};


/**
 * @param {util.io.Entity} key Ключ хранения.
 * @return {util.io.Entity} Сушность.
 */
util.io.ICache.prototype.pullEntity = function(key) {};


/**
 * @param {util.io.Entity} key Ключ хранения.
 * @param {util.io.Entity} entity Cущность.
 */
util.io.ICache.prototype.stashEntity = function(key, entity) {};
