

/**
 * @type {!Object.<string, !Array.<string>>}
 */
util.cli.__map = {};


/**
 * @type {!Object.<string, *>}
 */
util.cli.__defaults = {};


/**
 * @type {boolean}
 */
util.cli.__isParsed = false;


/**
 * @param {string} name Имя переменной.
 * @return {!Array} Значение.
 */
util.cli.getArray = function(name) {
  if (!util.cli.__isParsed) {
    util.cli.__extractValues();
  }

  if (util.cli.__map[name] !== undefined) {
    return util.cli.__map[name].slice(0);
  }

  if (util.cli.__defaults[name] !== undefined) {
    return [].concat(util.cli.__defaults[name]);
  }

  return [];
};


/**
 * @param {string} name Имя переменной.
 * @return {string} Значение.
 */
util.cli.getString = function(name) {
  if (!util.cli.__isParsed) {
    util.cli.__extractValues();
  }

  if (util.cli.__map[name] !== undefined &&
      util.cli.__map[name][0] !== undefined) {

    return util.cli.__map[name][0];
  }

  if (util.cli.__defaults[name] !== undefined) {
    return String(util.cli.__defaults[name]);
  }

  return '';
};


/**
 * @param {string} name Имя переменной.
 * @return {number} Значение.
 */
util.cli.getNumber = function(name) {
  if (!util.cli.__isParsed) {
    util.cli.__extractValues();
  }

  if (util.cli.__map[name] !== undefined &&
      util.cli.__map[name][0] !== undefined) {

    return Number(util.cli.__map[name][0]);
  }

  if (util.cli.__defaults[name] !== undefined) {
    return Number(util.cli.__defaults[name]);
  }

  return 0;
};


/**
 * @param {string} name Имя переменной.
 * @return {boolean} Значение.
 */
util.cli.getBoolean = function(name) {
  if (!util.cli.__isParsed) {
    util.cli.__extractValues();
  }

  if (util.cli.__map[name] === undefined) {
    return Boolean(util.cli.__defaults[name]);
  }

  return util.cli.__map[name].length > 0 &&
      util.cli.__map[name][0].toLowerCase() !== 'false' &&
          Boolean(util.cli.__map[name][0]);
};


/**
 *
 */
util.cli.__extractValues = function() {
  var agrv = process.argv;
  var args = [];

  util.cli.__map = {};

  for (var i = 0, l = agrv.length; i < l; i += 1) {
    args = args.concat(agrv[i].split('='));
  }

  var currentArg = '';
  while (args.length > 0) {
    currentArg = util.cli.__applyArgument(args.shift(), currentArg);
  }

  util.cli.__isParsed = true;
};


/**
 * @param {string} arg Аргумент.
 * @param {string} currentArg Аргумент.
 * @return {string} Аргумент.
 */
util.cli.__applyArgument = function(arg, currentArg) {
  var value = '';
  var newArg = '';

  if (arg.indexOf('--') === 0) {
    newArg = arg.substr(2);
  } else {
    value = arg;
  }

  if (currentArg !== '') {
    if (!util.cli.__map[currentArg]) {
      util.cli.__map[currentArg] = [];
    }

    util.cli.__map[currentArg].push(value);
    currentArg = '';
  }

  if (newArg !== '') {
    currentArg = newArg;
  }

  return currentArg;
};
