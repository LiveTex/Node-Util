


/**
 * @constructor
 */
util.Logger = function() {

  /**
   * @type {number}
   */
  this.__level = util.Logger.LEVEL_INFO;
};


/**
 * @type {number}
 */
util.Logger.LEVEL_INFO = 3;


/**
 * @type {number}
 */
util.Logger.LEVEL_WARNING = 2;


/**
 * @type {number}
 */
util.Logger.LEVEL_ERROR = 1;


/**
 * @type {number}
 */
util.Logger.LEVEL_SILENT = 0;


/**
 * @enum {string}
 */
util.Logger.__COLOR = {
  GREEN: '\033[32m',
  YELLOW: '\033[33m',
  RED: '\033[31m',
  MAGENTA: '\033[35m',
  LIGHT_GRAY: '\033[1;30m',
  RESET: '\033[0m'
};


/**
 * @type {!Object.<string, !util.Logger.__COLOR>}
 */
util.Logger.__LEVEL_COLORS = {
  'INFO': util.Logger.__COLOR.LIGHT_GRAY,
  'WARNING': util.Logger.__COLOR.YELLOW,
  'ERROR': util.Logger.__COLOR.RED
};


/**
 * @param {string} level Уровень вывода логов.
 * @param {!Arguments} args Аргументы.
 * @return {!Array} Агрументы.
 */
util.Logger.__getArgs = function(level, args) {
  return [util.Logger.__LEVEL_COLORS[level],
          '[' + (new Date()).toLocaleString()
          .match(/[^\s]+/g)
          .slice(1, 5)
          .join(' ') + ']',
          '[' + level + ']:'].concat(Array.prototype.slice.call(args),
      util.Logger.__COLOR.RESET);
};


/**
 * @param {*} console Объект консоли.
 */
util.Logger.prototype.setConsole = function(console) {
  console.info = this.__info.bind(this);
  console.warn = this.__warn.bind(this);
  console.error = this.__error.bind(this);
};


/**
 * @param {number} level Уровень вывода логов.
 */
util.Logger.prototype.setLevel = function(level) {
  this.__level = level;
};


/**
 * @return {number} Уровень вывода логов.
 */
util.Logger.prototype.getLevel = function() {
  return this.__level;
};


/**
 *
 */
util.Logger.prototype.__info = function() {
  this.__level > 2 &&
      console.log.apply(console, util.Logger.__getArgs('INFO', arguments));
};


/**
 *
 */
util.Logger.prototype.__warn = function() {
  this.__level > 1 &&
      console.log.apply(console, util.Logger.__getArgs('WARNING', arguments));
};


/**
 *
 */
util.Logger.prototype.__error = function() {
  if (this.__level > 0) {
    var e = new Error();
    var stackLines = e.stack.split('\n');
    if (stackLines.length >= 2) {
      stackLines = stackLines.slice(2);
    }

    console.log.apply(console, util.Logger.__getArgs('ERROR', arguments));
    console.log(util.Logger.__LEVEL_COLORS.ERROR + stackLines.join('\n') +
        util.Logger.__COLOR.RESET);
  }
};
