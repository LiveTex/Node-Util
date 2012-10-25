


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
 * @param {string} level Уровень вывода логов.
 * @param {!Arguments} args Аргументы.
 * @return {!Array} Агрументы.
 */
cli.Logger.__getArgs = function(level, args) {
  return ['[' + (new Date()).toLocaleString()
                             .match(/[^\s]+/g)
                             .slice(1, 5)
                             .join(' ') + ']',
           '[' + level + ']:'].concat(Array.prototype.slice.call(args));
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
  this.__level > 0 &&
      console.log.apply(console, cli.Logger.__getArgs('ERROR', arguments));
};
