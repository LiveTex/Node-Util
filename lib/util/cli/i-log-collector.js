


/**
 * @interface
 */
util.cli.ILogCollector = function() {};


/**
 * @param {...} var_args
 */
util.cli.ILogCollector.prototype.info = function(var_args) {};


/**
 * @param {...} var_args
 */
util.cli.ILogCollector.prototype.warn = function(var_args) {};


/**
 * @param {...} var_args
 */
util.cli.ILogCollector.prototype.error = function(var_args) {};
