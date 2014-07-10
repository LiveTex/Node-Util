

/**
 * @param {number=} opt_level
 * @param {boolean=} opt_copyToConsole
 */
util.log.init = function(opt_level, opt_copyToConsole) {
  console.__log = console.log;

  if (opt_level !== undefined) {
    util.log.__level = opt_level;
  }

  util.log.__copyToConsole = opt_copyToConsole || false;

  console.log = util.log.__log;
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
 * @param {...} var_args
 */
util.log.__log = function(var_args) {
  var message = arguments[0];
  var pairs = arguments[1];
  if (util.log.__collector !== null && util.log.__ready) {
    util.log.__ready = false;
    var text = util.log.__timestamp() + message;
    util.log.__collector.collect(text,
        pairs instanceof Object ? pairs : undefined);
    util.log.__ready = true;
  }

  if (util.log.__copyToConsole) {
    console.__log.apply(console, [text, pairs || '']);
  }
};


/**
 * @param {...} var_args
 */
util.log.__info = function(var_args) {
  if (util.log.__level > 2) {
    var message = arguments[0];
    var pairs = arguments[1];
    var text = util.log.Prefix.INFO + ' ' + util.log.__timestamp() + message;
    if (util.log.__collector !== null && util.log.__ready) {
      util.log.__ready = false;
      util.log.__collector.collect(text,
          pairs instanceof Object ? pairs : undefined);
      util.log.__ready = true;
    }

    if (util.log.__copyToConsole) {
      console.__log.apply(console,
          util.log.__args(util.log.Color.LIGHT_GRAY, [text, pairs || '']));
    }
  }
};


/**
 * @param {...} var_args
 */
util.log.__warn = function(var_args) {
  if (util.log.__level > 1) {
    var message = arguments[0];
    var pairs = arguments[1];
    var fn = new Error().stack.split('\n').slice(2)[0] || '';
    var text = util.log.Prefix.WARN + ' ' + util.log.__timestamp() + ' ' +
        fn.substring(7, fn.indexOf('(') - 1) + ' ' + message;
    if (util.log.__collector !== null && util.log.__ready) {
      util.log.__ready = false;
      util.log.__collector.collect(text,
          pairs instanceof Object ? pairs : undefined);
      util.log.__ready = true;
    }

    if (util.log.__copyToConsole) {
      console.__log.apply(console,
          util.log.__args(util.log.Color.YELLOW, [text, pairs || '']));
    }
  }
};


/**
 * @param {...} var_args
 */
util.log.__error = function(var_args) {
  if (util.log.__level > 0) {
    var message = arguments[0];
    var pairs = arguments[1];
    var fn = new Error().stack.split('\n').slice(2)[0] || '';
    var stackLines = new Error().stack.split('\n');
    if (stackLines.length >= 2) {
      stackLines = stackLines.slice(2);
    }

    var stackText = util.log.Prefix.ERROR_STACK + ' | ' +
        stackLines.join('\n' + util.log.Prefix.ERROR_STACK + ' | ');
    var text = util.log.Prefix.ERROR + ' ' + util.log.__timestamp() + ' ' +
        fn.substring(7, fn.indexOf('(') - 1) + ' ' + message + '\n' + stackText;

    if (util.log.__collector !== null && util.log.__ready) {
      util.log.__ready = false;
      util.log.__collector.collect(text,
          pairs instanceof Object ? pairs : undefined);
      util.log.__ready = true;
    }

    if (util.log.__copyToConsole) {
      console.__log.apply(console,
          util.log.__args(util.log.Color.RED, [text, pairs || '']));
    }
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
util.log.__copyToConsole = false;


/**
 * @type {util.log.IEventCollector}
 */
util.log.__collector = null;
