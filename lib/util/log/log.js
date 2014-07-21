

/**
 * @param {number=} opt_level
 * @param {boolean=} opt_useAdditionalLog
 */
util.log.init = function(opt_level, opt_useAdditionalLog) {
  console.__log = console.log;

  if (opt_level !== undefined) {
    util.log.__level = opt_level;
  }

  util.log.__useAdditionalLog = opt_useAdditionalLog || false;

  console.log = util.log.__log;
  console.info = util.log.__info;
  console.warn = util.log.__warn;
  console.error = util.log.__error;
};


/**
 * @param {util.log.AdditionalLog} logger .
 */
util.log.setAdditionalLog = function(logger) {
  util.log.__additionalLog = logger;
};


/**
 * @param {util.log.Color} color
 * @param {!Array} args
 * @return {!Array}
 */
util.log.__args = function(color, args) {
  return [color].concat(args).concat(util.log.Color.__RESET);
};


/**
 * @return {string} Timestamp string.
 */
util.log.__timestamp = function() {
  var date = new Date();
  var ms = String(date.getMilliseconds());
  while (ms.length < 3) {
    ms = '0' + ms;
  }

  return String(date).split(' ').slice(1, 5).join(' ') + '.' + ms + ' ';
};


/**
 * @param {!Arguments} args
 * @return {string}
 */
util.log.__filterText = function(args) {
  return args[0] || '';
};


/**
 * @param {!Arguments} args
 * @return {!Object|undefined}
 */
util.log.__filterOrd = function(args) {
  return args[1] instanceof Object ? args[1] : undefined;
};


/**
 * @param {...} var_args
 */
util.log.__log = function(var_args) {
  var message = util.log.__filterText(arguments);
  var ord = util.log.__filterOrd(arguments);

  if (util.log.__ready) {
    util.log.__ready = false;
    var text = util.log.__timestamp() + message;
    var additionalInfo =
        util.log.__useAdditionalLog ? util.log.__additionalLog() : '';
    util.log.__ready = true;
  }

  console.__log.apply(console, [text, ord || '', additionalInfo || '']);
};


/**
 * @param {...} var_args
 */
util.log.__info = function(var_args) {
  if (util.log.__level > 2) {
    var message = util.log.__filterText(arguments);
    var ord = util.log.__filterOrd(arguments);
    var fn = new Error().stack.split('\n').slice(2)[0] || '';
    var text = util.log.Prefix.INFO + ' ' + util.log.__timestamp() + ' ' +
        fn.substring(7, fn.indexOf('(') - 1) + ' ' + message;

    if (util.log.__ready) {
      util.log.__ready = false;
      var additionalInfo =
          util.log.__useAdditionalLog ? util.log.__additionalLog() : '';
      util.log.__ready = true;
    }

    console.__log.apply(console,
        util.log.__args(util.log.Color.LIGHT_GRAY, [text, ord || '',
          additionalInfo || '']));
  }
};


/**
 * @param {...} var_args
 */
util.log.__warn = function(var_args) {
  if (util.log.__level > 1) {
    var message = util.log.__filterText(arguments);
    var ord = util.log.__filterOrd(arguments);
    var fn = new Error().stack.split('\n').slice(2)[0] || '';
    var text = util.log.Prefix.WARN + ' ' + util.log.__timestamp() + ' ' +
        fn.substring(7, fn.indexOf('(') - 1) + ' ' + message;

    if (util.log.__ready) {
      util.log.__ready = false;
      var additionalInfo =
          util.log.__useAdditionalLog ? util.log.__additionalLog() : '';
      util.log.__ready = true;
    }

    console.__log.apply(console,
        util.log.__args(
            util.log.Color.YELLOW, [text, ord || '', additionalInfo || '']));
  }
};


/**
 * @param {...} var_args
 */
util.log.__error = function(var_args) {
  if (util.log.__level > 0) {
    var message = util.log.__filterText(arguments);
    var ord = util.log.__filterOrd(arguments);
    var fn = new Error().stack.split('\n').slice(2)[0] || '';
    var stackLines = new Error().stack.split('\n');

    if (stackLines.length >= 2) {
      stackLines = stackLines.slice(2);
    }
    var stackText = util.log.Prefix.ERROR_STACK + ' | ' +
        stackLines.join('\n' + util.log.Prefix.ERROR_STACK + ' | ');
    var text = util.log.Prefix.ERROR + ' ' + util.log.__timestamp() + ' ' +
        fn.substring(7, fn.indexOf('(') - 1) + ' ' + message + '\n' + stackText;

    if (util.log.__ready) {
      util.log.__ready = false;
      var additionalInfo =
          util.log.__useAdditionalLog ? util.log.__additionalLog() : '';
      util.log.__ready = true;
    }

    console.__log.apply(console,
        util.log.__args(
            util.log.Color.RED, [text, ord || '', additionalInfo || '']));
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
 * @type {boolean}
 */
util.log.__useConsole = false;


/**
 * @param {!Object=} opt_ord
 * @return {string}
 */
util.log.__additionalLog = function(opt_ord) {
  return '';
};
