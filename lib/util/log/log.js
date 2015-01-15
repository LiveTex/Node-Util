

/**
 * @typedef {?function(!Object=):string}
 */
util.log.AdditionalLog;


/**
 * @param {number=} opt_level
 * @param {!util.log.AdditionalLog=} opt_additionalLog .
 */
util.log.init = function(opt_level, opt_additionalLog) {
  console.__log = console.log;

  if (opt_level !== undefined) {
    util.log.__level = opt_level;
  }

  if (opt_additionalLog) {
    util.log.__additionalLog = opt_additionalLog;
  }

  console.log = util.log.__log;
  console.info = util.log.__info;
  console.warn = util.log.__warn;
  console.error = util.log.__error;
  console.debug = util.log.__debug;
};


/**
 * @param {util.log.Color} color
 * @param {!Array} args
 * @return {!Array}
 */
util.log.__hilight = function(color, args) {
  return [color].concat(args).concat(util.log.Color.__RESET);
};


/**
 * @param {number} num
 * @param {number} digits
 * @return {string}
 */
util.log.__formatNumber = function(num, digits) {
  var res = String(num);
  while (res.length < digits) {
    res = '0' + res;
  }
  return res;
};


/**
 * @return {string} Timestamp string.
 */
util.log.__timestamp = function() {
  var f = util.log.__formatNumber;
  var date = new Date();
  var year = String(date.getFullYear());
  var month = f(date.getMonth(), 2);
  var day = f(date.getDate(), 2);
  var hour = f(date.getHours(), 2);
  var min = f(date.getMinutes(), 2);
  var sec = f(date.getSeconds(), 2);
  var ms = f(date.getMilliseconds(), 3);

  return year + month + day + ' ' +
      hour + ':' + min + ':' + sec + '.' + ms;
};


/**
 * @return {string}
 */
util.log.__resolveContext = function() {
  var fn = new Error().stack.split('\n').slice(5)[0] || '';
  return '[' + fn.substring(7, fn.indexOf('(') - 1) + ']';
};


/**
 * logKind - INFO, ERROR, etc...
 *
 * @param {string} logPrefix
 * @return {Array.<string>}
 */
util.log.__buildPrefix = function(logPrefix) {
  return [util.log.__timestamp(), util.log.Prefix[logPrefix],
    util.log.__resolveContext()];
};


/**
 * @param {...} var_args
 */
util.log.__log = function(var_args) {
  if (util.log.__level > 3) {
    var argv = Array.prototype.slice.call(arguments);
    util.log.__print(argv, 'LOG');
  }
};


/**
 * @param {Array.<*>} args
 * @param {string} kind
 * @param {string=} opt_color
 */
util.log.__print = function(args, kind, opt_color) {
  var output = util.log.__buildPrefix(kind).concat(args)
    .concat([util.log.__additionalLog()]);

  var color = opt_color || null;
  if (typeof opt_color === 'string') {
    output = util.log.__hilight(util.log.Color[color], output);
  }
  else {
    output = (['']).concat(output);
  }

  console.__log.apply(console, output);

};


/**
 * @param {...} var_args
 */
util.log.__info = function(var_args) {
  if (util.log.__level > 2) {
    var argv = Array.prototype.slice.call(arguments);
    util.log.__print(argv, 'INFO', 'LIGHT_GRAY');
  }
};


/**
 * @param {...} var_args
 */
util.log.__debug = function(var_args) {
  if (util.log.__level > 3) {
    var argv = Array.prototype.slice.call(arguments);
    util.log.__print(argv, 'DEBUG');
  }
};


/**
 * @param {...} var_args
 */
util.log.__warn = function(var_args) {
  if (util.log.__level > 1) {
    var argv = Array.prototype.slice.call(arguments);
    util.log.__print(argv, 'WARN', 'YELLOW');
  }
};


/**
 * @param {...} var_args
 */
util.log.__error = function(var_args) {
  if (util.log.__level > 0) {
    var argv = Array.prototype.slice.call(arguments);
    var stackLines = new Error().stack.split('\n');

    if (stackLines.length >= 2) {
      stackLines = stackLines.slice(2);
    }
    var stackText = '\n' + util.log.Prefix.ERROR_STACK + ' | ' +
        stackLines.join('\n' + util.log.Prefix.ERROR_STACK + ' | ');

    var payload = argv.concat(stackText);
    util.log.__print(payload, 'ERROR', 'RED');
  }
};


/**
 * @type {number}
 */
util.log.__level = 3;


/**
 * @param {!Object=} opt_ord
 * @return {string}
 */
util.log.__additionalLog = function(opt_ord) {
  return '';
};
