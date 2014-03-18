


/**
 * @param {number=} opt_level Уровень вывода логов.
 * @constructor
 */
util.log.Logger = function(opt_level) {

  /**
   * @type {number}
   */
  this.__level = opt_level || util.cli.Logger.LEVEL_INFO;

  /**
   * @type {util.log.ILogCollector}
   */
  this.__collector = null;
};


/**
 * @type {number}
 */
util.log.Logger.LEVEL_INFO = 3;


/**
 * @type {number}
 */
util.log.Logger.LEVEL_WARNING = 2;


/**
 * @type {number}
 */
util.log.Logger.LEVEL_ERROR = 1;


/**
 * @type {number}
 */
util.log.Logger.LEVEL_SILENT = 0;


/**
 * @enum {string}
 */
util.log.Logger.__COLOR = {
  GREEN: '\033[32m',
  YELLOW: '\033[33m',
  RED: '\033[31m',
  MAGENTA: '\033[35m',
  LIGHT_GRAY: '\033[1;30m',
  RESET: '\033[0m'
};


/**
 * @type {!Object.<string, !util.log.Logger.__COLOR>}
 */
util.log.Logger.__LEVEL_COLORS = {
  'INFO': util.log.Logger.__COLOR.LIGHT_GRAY,
  'WARNING': util.log.Logger.__COLOR.YELLOW,
  'ERROR': util.log.Logger.__COLOR.RED
};


/**
 * @param {string} level Уровень вывода логов.
 * @param {!Arguments} args Аргументы.
 * @return {!Array} Агрументы.
 */
util.log.Logger.__getArgs = function(level, args) {
  return [util.log.Logger.__LEVEL_COLORS[level],
          '[' + (new Date()).toLocaleString()
          .match(/[^\s]+/g)
          .slice(1, 5)
          .join(' ') + ']',
          '[' + level + ']:'].concat(Array.prototype.slice.call(args),
      util.log.Logger.__COLOR.RESET);
};


/**
 * @param {*} console Объект консоли.
 */
util.log.Logger.prototype.setConsole = function(console) {
  console.info = this.__info.bind(this);
  console.warn = this.__warn.bind(this);
  console.error = this.__error.bind(this);
};


/**
 * @return {number} Уровень вывода логов.
 */
util.log.Logger.prototype.getLevel = function() {
  return this.__level;
};


/**
 * @param {util.log.ILogCollector} collector
 */
util.log.Logger.prototype.setCollector = function(collector) {
  this.__collector = collector;
};


/**
 *
 */
util.log.Logger.prototype.__info = function() {
  this.__level > 2 &&
      console.log.apply(console, util.log.Logger.__getArgs('INFO', arguments));

  if (this.__collector !== null) {
    this.__collector.info(arguments);
  }
};


/**
 *
 */
util.log.Logger.prototype.__warn = function() {
  this.__level > 1 && console.log.apply(console,
      util.log.Logger.__getArgs('WARNING', arguments));

  if (this.__collector !== null) {
    this.__collector.warn(arguments);
  }
};


/**
 *
 */
util.log.Logger.prototype.__error = function() {
  if (this.__level > 0) {
    var e = new Error();
    var stackLines = e.stack.split('\n');
    if (stackLines.length >= 2) {
      stackLines = stackLines.slice(2);
    }

    console.log.apply(console, util.log.Logger.__getArgs('ERROR', arguments));
    console.log(util.log.Logger.__LEVEL_COLORS.ERROR + stackLines.join('\n') +
        util.log.Logger.__COLOR.RESET);
  }

  if (this.__collector !== null) {
    this.__collector.error(arguments);
  }
};
