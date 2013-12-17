


/**
 * @interface
 */
util.ISafeObject = function() {};


/**
 * Returns data.
 *
 * @param {...(string|number)} var_args Path to value.
 * @return {string} Data.
 */
util.ISafeObject.prototype.getString = function(var_args) {};


/**
 * Returns data.
 *
 * @param {...(string|number)} var_args Path to value.
 * @return {number} Data.
 */
util.ISafeObject.prototype.getNumber = function(var_args) {};


/**
 * Returns data.
 *
 * @param {...(string|number)} var_args Path to value.
 * @return {boolean} Data.
 */
util.ISafeObject.prototype.getBoolean = function(var_args) {};


/**
 * Returns data.
 *
 * @param {...(string|number)} var_args Path to value.
 * @return {!Object} Data.
 */
util.ISafeObject.prototype.getObject = function(var_args) {};


/**
 * Returns data.
 *
 * @param {...(string|number)} var_args Path to value.
 * @return {string|number|boolean|Object} Data.
 */
util.ISafeObject.prototype.get = function(var_args) {};


/**
 * Stores data to a key by its path.
 *
 * @param {string|number|boolean|Object} value Data.
 * @param {...(string|number)} var_args Path to value.
 */
util.ISafeObject.prototype.set = function(value, var_args) {};

