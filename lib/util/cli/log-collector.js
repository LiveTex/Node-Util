


/**
 * @constructor
 * @implements {util.cli.ILogCollector}
 */
util.cli.LogCollector = function() {};


/**
 * @param {...} var_args
 */
util.cli.LogCollector.prototype.info = function(var_args) {};


/**
 * @param {...} var_args
 */
util.cli.LogCollector.prototype.warn = function(var_args) {};


/**
 * @param {...} var_args
 */
util.cli.LogCollector.prototype.error = function(var_args) {};
