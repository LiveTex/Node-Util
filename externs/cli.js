


/**
 * @namespace
 */
var cli = {};


/**
 * @constructor
 */
cli.Arguments = function() {};


/**
 * @param {string} name
 * @param {*=} opt_defaultValue
 */
cli.Arguments.prototype.registerValue = function(name, opt_defaultValue) {};


/**
 * @param {!Array.<string>} agrv
 */
cli.Arguments.prototype.extractValues = function(agrv) {};


/**
 * @param {string} name
 * @return {Array.<string>}
 */
cli.Arguments.prototype.getArray = function(name) {};


/**
 * @param {string} name
 * @return {string}
 */
cli.Arguments.prototype.getString = function(name) {};


/**
 * @param {string} name
 * @return {number}
 */
cli.Arguments.prototype.getNumber = function(name) {};


/**
 * @param {string} name
 * @return {boolean}
 */
cli.Arguments.prototype.getBoolean = function(name) {};


/**
 * @return {!cli.Arguments}
 */
cli.Arguments.getInstance = function() {};

/**
 * @constructor
 */
cli.Logger = function() {};


/**
 * @const
 * @type {number}
 */
cli.Logger.LEVEL_INFO = 3;


/**
 * @const
 * @type {number}
 */
cli.Logger.LEVEL_WARNING = 2;


/**
 * @const
 * @type {number}
 */
cli.Logger.LEVEL_ERROR = 1;


/**
 * @const
 * @type {number}
 */
cli.Logger.LEVEL_SILENT = 0;


/**
 * @param {*} console
 */
cli.Logger.prototype.setConsole = function(console) {};


/**
 * @param {number} level
 */
cli.Logger.prototype.setLevel = function(level) {};


/**
 * @return {number}
 */
cli.Logger.prototype.getLevel = function() {};
