


/**
 * @interface
 */
util.log.ILogCollector = function() {};


/**
 * @param {...} var_args
 */
util.log.ILogCollector.prototype.info = function(var_args) {};


/**
 * @param {...} var_args
 */
util.log.ILogCollector.prototype.warn = function(var_args) {};


/**
 * @param {...} var_args
 */
util.log.ILogCollector.prototype.error = function(var_args) {};
