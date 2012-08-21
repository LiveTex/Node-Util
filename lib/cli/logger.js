


/**
 * @constructor
 */
cli.Logger = function() {

  /**
   * @type {number}
   * @private
   */
  this.__level = cli.Logger.LEVEL_INFO;
};


/**
 * @const
 * @type {number}
 */
cli.Logger.LEVEL_INFO = 3;


/**
 * @const
 * @type {number}
 */
cli.Logger.LEVEL_WARNING = 2;


/**
 * @const
 * @type {number}
 */
cli.Logger.LEVEL_ERROR = 1;


/**
 * @const
 * @type {number}
 */
cli.Logger.LEVEL_SILENT = 0;


/**
 * @private
 * @static
 *
 * @param {string} level
 * @param {!Arguments} args
 * @return {!Array}
 */
cli.Logger.__getArgs = function(level, args) {
  return [ '[' + (new Date()).toLocaleString()
                             .match(/[^\s]+/g)
                             .slice(1, 5)
                             .join(' ') + ']',
           '[' + level + ']:'].concat(Array.prototype.slice.call(args));
};


/**
 * @param {*} console
 */
cli.Logger.prototype.setConsole = function(console) {
  console.info  = this.__info.bind(this);
  console.warn  = this.__warn.bind(this);
  console.error = this.__error.bind(this);
};


/**
 * @param {number} level
 */
cli.Logger.prototype.setLevel = function(level) {
  this.__level = level;
};


/**
 * @return {number}
 */
cli.Logger.prototype.getLevel = function() {
  return this.__level;
};


/**
 * @private
 */
cli.Logger.prototype.__info = function() {
  this.__level > 2 &&
    console.log.apply(console, cli.Logger.__getArgs('INFO', arguments));
};


/**
 * @private
 */
cli.Logger.prototype.__warn = function() {
  this.__level > 1 &&
    console.log.apply(console, cli.Logger.__getArgs('WARNING', arguments));
};


/**
 * @private
 */
cli.Logger.prototype.__error = function() {
  if (this.__level > 0) {
    console.log.apply(console, cli.Logger.__getArgs('ERROR', arguments));

    if (arguments[0] instanceof Error) {
      console.log(arguments[0].getStackTrace());
    }
  }
};

