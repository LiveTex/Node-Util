

/**
 * @typedef {function(!Object=):!Object}
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
};


/**
 * @param {...} var_args
 */
util.log.debug = function(var_args) {
  process.stdout.write.apply(process.stdout, arguments);
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
 * @return {!Object}
 */
util.log.__wrapToJson = function(args) {
  var outputData = args[1] instanceof Object ? args[1] : {};
  outputData['event'] = args[0] || '';
  outputData['timestamp'] = util.log.__timestamp();
  return util.obj.merge(outputData, util.log.__additionalLog());
};


/**
 * @param {...} var_args
 */
util.log.__log = function(var_args) {
  if (util.log.__level > 3) {
    var data = util.log.__wrapToJson(arguments);
    data['message_type'] = util.log.Prefix.LOG;
    console.__log.apply(console, [JSON.stringify(data)]);
  }
};


/**
 * @param {...} var_args
 */
util.log.__info = function(var_args) {
  if (util.log.__level > 2) {
    var data = util.log.__wrapToJson(arguments);
    var fn = new Error().stack.split('\n').slice(2)[0] || '';
    data['message_type'] = util.log.Prefix.INFO;
    data['stack'] = fn.substring(7, fn.indexOf('(') - 1);

    console.__log.apply(console, [JSON.stringify(data)]);
  }
};


/**
 * @param {...} var_args
 */
util.log.__warn = function(var_args) {
  if (util.log.__level > 1) {
    var data = util.log.__wrapToJson(arguments);
    var fn = new Error().stack.split('\n').slice(2)[0] || '';
    data['message_type'] = util.log.Prefix.WARN;
    data['stack'] = fn.substring(7, fn.indexOf('(') - 1);
    console.__log.apply(console, [JSON.stringify(data)]);
  }
};


/**
 * @param {...} var_args
 */
util.log.__error = function(var_args) {
  if (util.log.__level > 0) {
    var data = util.log.__wrapToJson(arguments);
    data['message_type'] = util.log.Prefix.ERROR;
    data['stack'] = new Error().stack;
    console.__log.apply(console, [JSON.stringify(data)]);
  }
};


/**
 * @type {number}
 */
util.log.__level = 3;


/**
 * @param {!Object=} opt_ord
 * @return {!Object}
 */
util.log.__additionalLog = function(opt_ord) {
  return {};
};
