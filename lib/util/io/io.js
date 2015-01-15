

/**
 * @type {string}
 */
util.io.ENCODING = 'utf8';


/**
 * @type {string}
 */
util.io.RELATIVE_PROJECT_ROOT = '..';


/**
 * @param {string} filename to JSON config
 * REQ: filename - абсолютный путь к JSON файлу
 *      если нужен relative, то нужно добавлять префикс './' иначе
 *      будет исключение
 * @return {!Object}
 */
util.io.requireObject = function(filename) {
  var result = util.io.require(filename);
  if (result instanceof Object) {
    return result;
  }

  return {};
};


/**
 * makes failsafe require
 * @param {string} filename
 * @return {*}
 */
util.io.require = function(filename) {
  var absPath = filename;

  // RESTRICTION: only posix
  if (absPath.charAt(0) !== '/') {
    var projectPath = path.join(path.dirname(module.filename),
        util.io.RELATIVE_PROJECT_ROOT);
    absPath = path.join(projectPath, filename);
  }

  try {
    return require(absPath);
  } catch (err) {
    console.error('Unable to require "' + filename + '": ' +
        err.message, err.stack);
  }

  return null;
};


