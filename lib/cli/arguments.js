


/**
 * @constructor
 */
cli.Arguments = function() {

  /**
   * @type {!Object.<string, !Array.<string>>}
   * @private
   */
  this.__map = {};

  /**
   * @type {!Object.<string, *>}
   * @private
   */
  this.__defaults = {};

  /**
   * @type {string}
   * @private
   */
  this.__currentArg = '';
};

/**
 * @param {string} name
 * @param {*=} opt_defaultValue
 */
cli.Arguments.prototype.registerValue = function(name, opt_defaultValue) {
  this.__map[name] = [];

  if (opt_defaultValue) {
    this.__defaults[name] = opt_defaultValue;
  }
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

  if (this.__defaults[name] !== undefined) {
    return [].concat(this.__defaults[name]);
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

  if (this.__defaults[name] !== undefined) {
    return String(this.__defaults[name]);
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

  if (this.__defaults[name] !== undefined) {
    return Number(this.__defaults[name]);
  }

  return NaN;
};


/**
 * @param {string} name
 * @return {boolean}
 */
cli.Arguments.prototype.getBoolean = function(name) {
  return this.__map[name] !== undefined &&
         this.__map[name].length > 0 || Boolean(this.__defaults[name]);
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


/**
 * @static
 * @type {cli.Arguments}
 * @private
 */
cli.Arguments.__instance = null;

/**
 * @return {!cli.Arguments}
 */
cli.Arguments.getInstance = function() {
  if (cli.Arguments.__instance === null) {
    cli.Arguments.__instance = new cli.Arguments();
  }

  return cli.Arguments.__instance;
};