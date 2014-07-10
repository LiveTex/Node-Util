


/**
 * @interface
 */
util.log.IEventCollector = function() {};


/**
 * @param {string} message
 * @param {!Object=} opt_ord
 */
util.log.IEventCollector.prototype.collect = function(message, opt_ord) {};
