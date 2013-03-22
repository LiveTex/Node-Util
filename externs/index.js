 

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
	RESET: '\033[0m'
};

/**
 * @param {string} level Уровень вывода логов.
 * @return {string} Цветной уровень.
 */
cli.Logger.__getColorizedLevel = function(level) {}

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




