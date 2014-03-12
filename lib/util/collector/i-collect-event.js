


/**
 * @interface
 */
util.collector.IEvent = function() {};


/**
 * @return {string} Сообщение.
 */
util.collector.IEvent.prototype.getMessage = function() {};


/**
 * @return {string} Ключ.
 */
util.collector.IEvent.prototype.getSetKey = function() {};


/**
 * @return {string} Ключ.
 */
util.collector.IEvent.prototype.getEntityKey = function() {};


/**
 * @param {string} key Ключ.
 * @param {string} value Значение.
 */
util.collector.IEvent.prototype.setField = function(key, value) {};


/**
 * @return {!Object} Поля.
 */
util.collector.IEvent.prototype.getFields = function() {};


/**
 * @return {!Array.<string>} Поля.
 */
util.collector.IEvent.prototype.getIncrFields = function() {};
