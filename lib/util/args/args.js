

/**
 * @type {!Object.<string, !Array.<string>>}
 */
util.args.__map = {};


/**
 * @type {!Object.<string, *>}
 */
util.args.__defaults = {};


/**
 * @param {!Array.<string>} agrv Аргументы командной строки.
 */
util.args.extractValues = function(agrv) {
  var args = [];

  for (var i = 0, l = agrv.length; i < l; i += 1) {
    args = args.concat(agrv[i].split('='));
  }

  var currentArg = '';
  while (args.length > 0) {
    currentArg = util.args.__applyArgument(args.shift(), currentArg);
  }
};


/**
 * @param {string} name Имя переменной.
 * @return {Array.<string>} Значение.
 */
util.args.getArray = function(name) {
  if (util.args.__map[name] !== undefined) {
    return util.args.__map[name].slice(0);
  }

  if (util.args.__defaults[name] !== undefined) {
    return [].concat(util.args.__defaults[name]);
  }

  return null;
};


/**
 * @param {string} name Имя переменной.
 * @return {string} Значение.
 */
util.args.getString = function(name) {
  if (util.args.__map[name] !== undefined &&
      util.args.__map[name][0] !== undefined) {

    return util.args.__map[name][0];
  }

  if (util.args.__defaults[name] !== undefined) {
    return String(util.args.__defaults[name]);
  }

  return '';
};


/**
 * @param {string} name Имя переменной.
 * @return {number} Значение.
 */
util.args.getNumber = function(name) {
  if (util.args.__map[name] !== undefined &&
      util.args.__map[name][0] !== undefined) {

    return Number(util.args.__map[name][0]);
  }

  if (util.args.__defaults[name] !== undefined) {
    return Number(util.args.__defaults[name]);
  }

  return 0;
};


/**
 * @param {string} name Имя переменной.
 * @return {boolean} Значение.
 */
util.args.getBoolean = function(name) {
  if (util.args.__map[name] === undefined) {
    return Boolean(util.args.__defaults[name]);
  }

  return util.args.__map[name].length > 0 &&
      util.args.__map[name][0].toLowerCase() !== 'false' &&
      Boolean(util.args.__map[name][0]);
};


/**
 * @param {string} arg Аргумент.
 * @param {string} currentArg Аргумент.
 * @return {string} Аргумент.
 */
util.args.__applyArgument = function(arg, currentArg) {
  var value = '';
  var newArg = '';

  if (arg.indexOf('--') === 0) {
    newArg = arg.substr(2);
  } else {
    value = arg;
  }

  if (currentArg !== '') {
    if (!util.args.__map[currentArg]) {
        util.args.__map[currentArg] = [];
    }

    util.args.__map[currentArg].push(value);
    currentArg = '';
  }

  if (newArg !== '') {
    currentArg = newArg;
  }

  return currentArg;
};
