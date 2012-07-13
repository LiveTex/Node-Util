


/**
 * @constructor
 */
cli.Arguments = function() {

  /**
   *
   * @type {!Object.<string, !Array.<string>>}
   * @private
   */
  this.__map = {};

  /**
   * @type {string}
   * @private
   */
  this.__currentArg = '';
};

/**
 * @param {string} name
 */
cli.Arguments.prototype.registerValue = function(name) {
  this.__map[name] = [];
};

/**
 * @param {!Array.<string>} agrv
 */
cli.Arguments.prototype.extractValues = function(agrv) {
  var args = agrv.join(' ').replace(/=/g, ' ').split(' ').concat('');
  while (args.length > 0) {
    this.__applyArgument(args.shift());
  }
};


/**
 * @param {string} name
 * @return {Array.<string>}
 */
cli.Arguments.prototype.getArray = function(name) {
  if (this.__map[name] !== undefined) {
    return this.__map[name].slice(0);
  }

  return null;
};


/**
 * @param {string} name
 * @return {string}
 */
cli.Arguments.prototype.getString = function(name) {
  if (this.__map[name] !== undefined &&
    this.__map[name][0] !== undefined) {

    return this.__map[name][0];
  }

  return '';
};


/**
 * @param {string} name
 * @return {number}
 */
cli.Arguments.prototype.getNumber = function(name) {
  if (this.__map[name] !== undefined &&
    this.__map[name][0] !== undefined) {

    return Number(this.__map[name][0]);
  }

  return NaN;
};


/**
 * @param {string} name
 * @return {boolean}
 */
cli.Arguments.prototype.getBoolean = function(name) {
  return this.__map[name] !== undefined && this.__map[name].length > 0;
};


/**
 * @param {string} arg
 * @private
 */
cli.Arguments.prototype.__applyArgument = function(arg) {
  var value = '';
  var newArg = '';

  if (arg.indexOf('--') === 0) {
    var name = arg.substr(2);

    if (this.__map[name] !== undefined) {
      newArg = name;
    }
  } else {
    value = arg;
  }

  if (this.__currentArg !== '') {
    this.__map[this.__currentArg].push(value);
    this.__currentArg = '';
  }

  if (newArg !== '') {
    this.__currentArg = newArg;
  }
};

