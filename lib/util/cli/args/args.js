

/**
 * @type {!Object.<string, !Array.<string>>}
 */
cli.args.__map = {};


/**
 * @type {!Object.<string, *>}
 */
cli.args.__defaults = {};


/**
 * @param {!Array.<string>} agrv Аргументы командной строки.
 */
cli.args.extractValues = function(agrv) {
  var args = [];

  for (var i = 0, l = agrv.length; i < l; i += 1) {
    args = args.concat(agrv[i].split('='));
  }

  var currentArg = '';
  while (args.length > 0) {
    currentArg = cli.args.__applyArgument(args.shift(), currentArg);
  }
};


/**
 * @param {string} name Имя переменной.
 * @return {Array.<string>} Значение.
 */
cli.args.getArray = function(name) {
  if (cli.args.__map[name] !== undefined) {
    return cli.args.__map[name].slice(0);
  }

  if (cli.args.__defaults[name] !== undefined) {
    return [].concat(cli.args.__defaults[name]);
  }

  return null;
};


/**
 * @param {string} name Имя переменной.
 * @return {string} Значение.
 */
cli.args.getString = function(name) {
  if (cli.args.__map[name] !== undefined &&
      cli.args.__map[name][0] !== undefined) {

    return cli.args.__map[name][0];
  }

  if (cli.args.__defaults[name] !== undefined) {
    return String(cli.args.__defaults[name]);
  }

  return '';
};


/**
 * @param {string} name Имя переменной.
 * @return {number} Значение.
 */
cli.args.getNumber = function(name) {
  if (cli.args.__map[name] !== undefined &&
      cli.args.__map[name][0] !== undefined) {

    return Number(cli.args.__map[name][0]);
  }

  if (cli.args.__defaults[name] !== undefined) {
    return Number(cli.args.__defaults[name]);
  }

  return 0;
};


/**
 * @param {string} name Имя переменной.
 * @return {boolean} Значение.
 */
cli.args.getBoolean = function(name) {
  if (cli.args.__map[name] === undefined) {
    return Boolean(cli.args.__defaults[name]);
  }

  return cli.args.__map[name].length > 0 &&
      cli.args.__map[name][0].toLowerCase() !== 'false' &&
      Boolean(cli.args.__map[name][0]);
};


/**
 * @param {string} arg Аргумент.
 * @param {string} currentArg Аргумент.
 * @return {string} Аргумент.
 */
cli.args.__applyArgument = function(arg, currentArg) {
  var value = '';
  var newArg = '';

  if (arg.indexOf('--') === 0) {
    newArg = arg.substr(2);
  } else {
    value = arg;
  }

  if (currentArg !== '') {
    if (!cli.args.__map[currentArg]) {
        cli.args.__map[currentArg] = [];
    }

    cli.args.__map[currentArg].push(value);
    currentArg = '';
  }

  if (newArg !== '') {
    currentArg = newArg;
  }

  return currentArg;
};
