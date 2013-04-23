

/**
 * @param {string} string Строка.
 * @param {boolean=} opt_forUrl Флаг URL-безопасного кодирования.
 * @return {string} Закодированная строка.
 */
util.base64.encodeNodeData = function(string, opt_forUrl) {
  var result = (new Buffer(string)).toString('base64');

  if (opt_forUrl) {
    result = result.replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=+\s*$/g, '');
  }

  return result;
};


/**
 * @param {string} string Закодированная строка.
 * @param {boolean=} opt_forUrl Флаг URL-безопасного кодирования.
 * @return {string} Строка.
 */
util.base64.decodeNodeData = function(string, opt_forUrl) {
  if (opt_forUrl) {
    string = string.replace(/-/g, '+').replace(/_/g, '/') +
        ('===').slice(0, string.length % 4);
  }

  return (new Buffer(string, 'base64')).toString();
};
