 

/**
 * @namespace
 */
var cli = {};

/**
 * @type {string}
 */
cli.VERSION = '0.1.0';

/**
 * @namespace
 */
cli.args = {};

/**
 * @constructor
 */
cli.Logger = function() {};

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
 * @param {*} console Объект консоли.
 */
cli.Logger.prototype.setConsole = function(console) {};

/**
 * @param {number} level Уровень вывода логов.
 */
cli.Logger.prototype.setLevel = function(level) {};

/**
 * @return {number} Уровень вывода логов.
 */
cli.Logger.prototype.getLevel = function() {};

/**
 * @constructor
 * @param {Object=} opt_data Данные.
 */
cli.Config = function(opt_data) {};

/**
 * @param {string} filename Путь к файлу с конфигом.
 */
cli.Config.prototype.load = function(filename) {};

/**
 * @param {!Array.<string>} configs Массив путей к файлам конфигов.
 */
cli.Config.prototype.multiLoad = function(configs) {};

/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {string} Результат.
 */
cli.Config.prototype.getString = function(var_args) {};

/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {number} Результат.
 */
cli.Config.prototype.getNumber = function(var_args) {};

/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {boolean} Результат.
 */
cli.Config.prototype.getBoolean = function(var_args) {};

/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {Object} Результат.
 * @deprecated Небезопасный метод.
 */
cli.Config.prototype.getObject = function(var_args) {};

/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Array.<string>} Результат.
 */
cli.Config.prototype.getObjectKeys = function(var_args) {};

/**
 * @param {...(string|number)} var_args Путь к данным.
 * @return {!Array} Результат.
 */
cli.Config.prototype.getArray = function(var_args) {};

/**
 * @return {!cli.Config} Единственный экземпляр.
 */
cli.Config.getInstance = function() {};

/**
 * @param {string} name Имя переменной.
 * @param {*=} opt_defaultValue Значение по-умолчанию.
 */
cli.args.registerValue = function(name, opt_defaultValue) {};

/**
 * @param {!Array.<string>} agrv Аргументы командной строки.
 */
cli.args.extractValues = function(agrv) {};

/**
 * @param {string} name Имя переменной.
 * @return {Array.<string>} Значение.
 */
cli.args.getArray = function(name) {};

/**
 * @param {string} name Имя переменной.
 * @return {string} Значение.
 */
cli.args.getString = function(name) {};

/**
 * @param {string} name Имя переменной.
 * @return {number} Значение.
 */
cli.args.getNumber = function(name) {};

/**
 * @param {string} name Имя переменной.
 * @return {boolean} Значение.
 */
cli.args.getBoolean = function(name) {};




