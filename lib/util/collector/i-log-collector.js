


/**
 * @interface
 */
util.collector.ILogCollector = function() {};


/**
 * @param {...} var_args
 */
util.collector.ILogCollector.prototype.info = function(var_args) {};


/**
 * @param {...} var_args
 */
util.collector.ILogCollector.prototype.warn = function(var_args) {};


/**
 * @param {...} var_args
 */
util.collector.ILogCollector.prototype.error = function(var_args) {};
