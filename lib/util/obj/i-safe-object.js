


/**
 * @interface
 */
util.obj.ISafeObject = function() {};


/**
 * Returns data.
 *
 * @param {...(string|number)} var_args Path to value.
 * @return {*} Data.
 */
util.obj.ISafeObject.prototype.get = function(var_args) {};


/**
 * Stores data to a key by its path.
 *
 * @param {*} value Data.
 * @param {...(string|number)} var_args Path to value.
 */
util.obj.ISafeObject.prototype.set = function(value, var_args) {};


/**
 * Returns data stored at key with certain path.
 *
 * @param {!Array.<(string|number)>} path Path to value.
 * @return {*} Data.
 */
util.obj.ISafeObject.prototype.getByPath = function(path) {};


/**
 * Stores data to a key with certain path.
 *
 * @param {*} value Data.
 * @param {!Array.<(string|number)>} path Path to value.
 */
util.obj.ISafeObject.prototype.setByPath = function(value, path) {};
