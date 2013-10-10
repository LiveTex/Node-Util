


/**
 * @constructor
 */
cli.Logger = function() {

  /**
   * @type {number}
   */
  this.__level = cli.Logger.LEVEL_INFO;
};


/**
 * @type {number}
 */
cli.Logger.LEVEL_INFO = 3;


/**
 * @type {number}
 */
cli.Logger.LEVEL_WARNING = 2;


/**
 * @type {number}
 */
cli.Logger.LEVEL_ERROR = 1;


/**
 * @type {number}
 */
cli.Logger.LEVEL_SILENT = 0;


/**
 * @enum {string}
 */
cli.Logger.__COLOR = {
  GREEN: '\033[32m',
  YELLOW: '\033[33m',
  RED: '\033[31m',
  MAGENTA: '\033[35m',
  LIGHT_GRAY: '\033[1;30m',
  RESET: '\033[0m'
};


/**
 * @type {!Object.<string, !cli.Logger.__COLOR>}
 */
cli.Logger.__LEVEL_COLORS = {
  'INFO': cli.Logger.__COLOR.LIGHT_GRAY,
  'WARNING': cli.Logger.__COLOR.YELLOW,
  'ERROR': cli.Logger.__COLOR.RED
};


/**
 * @param {string} level Уровень вывода логов.
 * @param {!Arguments} args Аргументы.
 * @return {!Array} Агрументы.
 */
cli.Logger.__getArgs = function(level, args) {
  return [cli.Logger.__LEVEL_COLORS[level],
          '[' + (new Date()).toLocaleString()
          .match(/[^\s]+/g)
          .slice(1, 5)
          .join(' ') + ']',
          '[' + level + ']:'].concat(Array.prototype.slice.call(args),
      cli.Logger.__COLOR.RESET);
};


/**
 * @param {*} console Объект консоли.
 */
cli.Logger.prototype.setConsole = function(console) {
  console.info = this.__info.bind(this);
  console.warn = this.__warn.bind(this);
  console.error = this.__error.bind(this);
};


/**
 * @param {number} level Уровень вывода логов.
 */
cli.Logger.prototype.setLevel = function(level) {
  this.__level = level;
};


/**
 * @return {number} Уровень вывода логов.
 */
cli.Logger.prototype.getLevel = function() {
  return this.__level;
};


/**
 *
 */
cli.Logger.prototype.__info = function() {
  this.__level > 2 &&
      console.log.apply(console, cli.Logger.__getArgs('INFO', arguments));
};


/**
 *
 */
cli.Logger.prototype.__warn = function() {
  this.__level > 1 &&
      console.log.apply(console, cli.Logger.__getArgs('WARNING', arguments));
};


/**
 *
 */
cli.Logger.prototype.__error = function() {
  if (this.__level > 0) {
    var e = new Error();
    var stackLines = e.stack.split('\n');
    if (stackLines.length >= 2) {
      stackLines = stackLines.slice(2);
    }

    console.log.apply(console, cli.Logger.__getArgs('ERROR', arguments));
    console.log(cli.Logger.__LEVEL_COLORS.ERROR + stackLines.join('\n') +
        cli.Logger.__COLOR.RESET);
  }
};
