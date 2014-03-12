


/**
 * @constructor
 * @param {string} message Сообщение.
 * @param {string} setKey Ключ множества.
 * @param {string} entityKey Ключ сущности.
 */
util.collector.Event = function(message, setKey, entityKey) {
  /**
   * @type {string}
   */
  this.__message = message;

  /**
   * @type {string}
   */
  this.__setKey = setKey;

  /**
   * @type {string}
   */
  this.__entityKey = entityKey;

  /**
   * @type {!Array.<string>}
   */
  this.__incrFields = ['count'];

  /**
   * @type {!Object}
   */
  this.__fields = {};

  this.setField('message', message);
};


/**
 * @return {string} Сообщение.
 */
util.collector.Event.prototype.getMessage = function() {
  return this.__message;
};


/**
 * @return {string} Ключ.
 */
util.collector.Event.prototype.getSetKey = function() {
  return this.__setKey;
};


/**
 * @return {string} Ключ.
 */
util.collector.Event.prototype.getEntityKey = function() {
  return this.__entityKey;
};


/**
 * @param {string} key Ключ.
 * @param {string} value Значение.
 */
util.collector.Event.prototype.setField = function(key, value) {
  this.__fields[key] = value;
};


/**
 * @return {!Object} Поля.
 */
util.collector.Event.prototype.getFields = function() {
  return this.__fields;
};


/**
 * @return {!Array.<string>} Поля.
 */
util.collector.Event.prototype.getIncrFields = function() {
  return this.__incrFields;
};
