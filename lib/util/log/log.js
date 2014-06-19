

/**
 * @param {number=} opt_level
 */
util.log.init = function(opt_level) {
  console.__log = console.log;

  if (opt_level !== undefined) {
    util.log.__level = opt_level;
  }

  console.log = util.log.__event;
  console.info = util.log.__info;
  console.warn = util.log.__warn;
  console.error = util.log.__error;
};


/**
 * @param {util.log.IEventCollector} collector
 */
util.log.setCollector = function(collector) {
  util.log.__collector = collector;
};


/**
 * @param {util.log.Color} color
 * @param {util.log.Prefix} prefix
 * @param {string} fn
 * @param {!Array} args
 * @return {!Array}
 */
util.log.__args = function(color, prefix, fn, args) {
  return [
    color,
    '[' + String(new Date()).match(/[^\s]+/g).slice(1, 5).join(' ') + ']',
    '[' + prefix + '] (' + fn + '):'
  ].concat(args).concat(util.log.Color.__RESET);
};


/**
 * @param {...} var_args
 */
util.log.__event = function(var_args) {
  var args = util.arr.cast(arguments);

  if (util.log.__collector !== null && util.log.__ready && args.length > 0) {
    util.log.__ready = false;
    util.log.__collector.collect(args.shift(), args);
    util.log.__ready = true;
  }
};


/**
 * @param {...} var_args
 */
util.log.__info = function(var_args) {
  var args = util.arr.cast(arguments);

  if (util.log.__level > 2) {
    var fn = new Error().stack.split('\n').slice(2)[0] || '';

    console.__log.apply(console, util.log.__args(util.log.Color.LIGHT_GRAY,
        util.log.Prefix.INFO, fn.substring(7, fn.indexOf('(') - 1), args));
  }
};


/**
 * @param {...} var_args
 */
util.log.__warn = function(var_args) {
  var args = util.arr.cast(arguments);

  if (util.log.__level > 1) {
    var fn = new Error().stack.split('\n').slice(2)[0] || '';

    console.__log.apply(console, util.log.__args(util.log.Color.YELLOW,
        util.log.Prefix.WARN, fn.substring(7, fn.indexOf('(') - 1), args));
  }
};


/**
 * @param {...} var_args
 */
util.log.__error = function(var_args) {
  var args = util.arr.cast(arguments);

  if (util.log.__level > 0) {
    var stackLines = new Error().stack.split('\n').slice(2);
    var fn = stackLines[0] || '';

    console.__log.apply(console, util.log.__args(util.log.Color.RED,
        util.log.Prefix.ERROR, fn.substring(7, fn.indexOf('(') - 1), args));

    console.__log(util.log.Color.RED + util.log.Prefix.ERROR_STACK + ' | ' +
        stackLines.join('\n' + util.log.Prefix.ERROR_STACK + ' | ') +
            util.log.Color.__RESET);
  }
};


/**
 * @type {boolean}
 */
util.log.__ready = true;


/**
 * @type {number}
 */
util.log.__level = 3;


/**
 * @type {util.log.IEventCollector}
 */
util.log.__collector = null;
