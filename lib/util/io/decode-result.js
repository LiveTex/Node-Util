


/**
 * @constructor
 * @param {util.io.Entity} target
 * @param {!Array.<!util.io.DecodeError>=} opt_errors
 */
util.io.DecodeResult = function(target, opt_errors) {

  /**
   * @type {util.io.Entity}
   */
  this.__entity = target instanceof Array ?
      (target.length > 0 ? target[0] : null) : target;

  /**
   * @type {!Array.<util.io.Entity>}
   */
  this.__entities = target instanceof Array ? target : [target];

  /**
   * @type {!Array.<!util.io.DecodeError>}
   */
  this.__errors = opt_errors || [];
};


/**
 * @return {!Array.<!util.io.DecodeError>} Массив ошибок.
 */
util.io.DecodeResult.prototype.getErrors = function() {
  return this.__errors;
};


/**
 * @return {!Array.<!util.io.Entity>} Закодированная сущность.
 */
util.io.DecodeResult.prototype.getEntities = function() {
  return this.__entities;
};


/**
 * @return {util.io.Entity} Закодированная сущность.
 */
util.io.DecodeResult.prototype.getEntity = function() {
  return this.__entity;
};
