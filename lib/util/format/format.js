

/**
 * Encodes object to JSON.
 *
 * @param {*} object The object to code.
 * @return {string} JSON string.
 */
util.format.encodeJson = function(object) {
  try {
    return JSON.stringify(object) || '';
  } catch (error) {
    console.warn('JSON encoding error: "' +
        error.message + '". [util.format.encodeJson]', object);
  }

  return '';
};


/**
 * Converts JSON to object.
 *
 * @param {string} data JSON string..
 * @return {*} JSON object.
 */
util.format.decodeJson = function(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.warn('JSON parsing error: "' +
        error.message + '". [util.format.decodeJson]', data);
  }

  return null;
};


/**
 * Encodes string to base64 format.
 *
 * @param {string} string Строка.
 * @param {boolean=} opt_forUrl Флаг URL-безопасного кодирования.
 * @return {string} Закодированная строка.
 */
util.format.encodeBase64 = function(string, opt_forUrl) {
  var result = (new Buffer(string)).toString('base64');

  if (opt_forUrl) {
    result = result.replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=+\s*$/g, '');
  }

  return result;
};


/**
 * Converts base64 to ordinary string.
 *
 * @param {string} string Base64 string.
 * @param {boolean=} opt_forUrl Flag for URL-safe decoding.
 * @return {string} Decoded string.
 */
util.format.decodeBase64 = function(string, opt_forUrl) {
  if (opt_forUrl) {
    string = string.replace(/-/g, '+').replace(/_/g, '/') +
        ('===').slice(0, string.length % 4);
  }

  return (new Buffer(string, 'base64')).toString();
};


/**
 * Converts object to x-www-form-urlencoded.
 *
 * @param {!Object} object Object to encode.
 * @param {string=} opt_separator Separator for name/value pairs.
 * @return {string} Encoded string.
 */
util.format.encodeFormData = function(object, opt_separator) {
  return util.format.__splitUrlData(object).join(opt_separator || '&');
};


/**
 * Converts string in x-www-form-urlencoded to object.
 *
 * @param {string} formData String in x-www-form-urlencoded.
 * @param {string=} opt_separator Separator for name/value pairs.
 * @return {!Object} Decoded object.
 */
util.format.decodeFormData = function(formData, opt_separator) {
  var result = new util.obj.SafeObject({});

  var values = formData.split(opt_separator || '&');
  var i = 0,
      l = values.length;

  while (i < l) {
    var ind = values[i].indexOf('=');
    var key = values[i].substr(0, ind);
    var value = values[i].substr(ind + 1, values[i].length);

    if (value !== '') {
      result.setByPath(util.format.unescape(value),
          util.format.__parseFormDataToken(key));
    }

    i++;
  }

  return result.getCore();
};


/**
 * Encodes special characters in url.
 *
 * @param {string} url URL-string.
 * @return {string} Encoded string.
 */
util.format.escape = function(url) {
  return encodeURIComponent(url);
};


/**
 * Decodes special characters in url.
 *
 * @param {string} url URL-string.
 * @return {string} Decoded string.
 */
util.format.unescape = function(url) {
  try {
    return decodeURIComponent(url);
  } catch (error) {
    console.warn('Malformed url: "' + url + '". [util.format.unescape]');
  }

  return '';
};


/**
 * @param {string} token Element of path in x-www-form-urlencoded string form.
 * @return {!Array.<string>} Generated path.
 */
util.format.__parseFormDataToken = function(token) {
  if (token.charAt(token.length - 1) !== ']') {
    return [token];
  }

  var nameLength = token.indexOf('[');
  return [token.substring(0, nameLength)].concat(
      token.substring(nameLength + 1, token.length - 1).split(']['));
};


/**
 * @param {!Object} object Object to encode.
 * @param {!Array.<string>=} opt_path The path to elementary unit of path.
 * @return {Array} Array of elementary data containing on object.
 */
util.format.__splitUrlData = function(object, opt_path) {
  var result = [];

  if (opt_path === undefined) {
    opt_path = [];
  }

  if (typeof object === 'object') {
    for (var key in object) {
      var newPath = opt_path.length === 0 ?
          [key] : (opt_path.join(',') + ',' + key).split(',');

      result = result.concat(util.format.__splitUrlData(object[key], newPath));
    }
  } else {
    result = [
      opt_path.shift() +
          (opt_path.length > 0 ? '[' + opt_path.join('][') + ']=' : '=') +
          util.format.escape(String(object))
    ];
  }

  return result;
};
