


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


/**
 * @param {!util.collector.Event} event Событие.
 */
util.collector.ILogCollector.prototype.save = function(event) {};


/**
 * @param {string} entityKey Имя сущности.
 * @param {string} fieldName Имя поля.
 * @param {string} value Значение.
 */
util.collector.ILogCollector.prototype.setField =
    function(entityKey, fieldName, value) {};


/**
 * @param {string} entityKey Имя сущности.
 * @param {string} fieldName Имя поля.
 */
util.collector.ILogCollector.prototype.incrField =
    function(entityKey, fieldName) {};


/**
 * @param {!util.collector.Event} event Событие.
 */
util.collector.ILogCollector.prototype.setFields = function(event) {};


/**
 * @param {!util.collector.Event} event Событие.
 */
util.collector.ILogCollector.prototype.incrFields = function(event) {};
