

/**
 * @namespace
 */
util.arr = {};


/**
 * @namespace
 */
util.fn = {};


/**
 * @namespace
 */
util.hash = {};


/**
 * @namespace
 */
util.io = {};


/**
 * @namespace
 */
util.obj = {};


/**
 * @type {number}
 */
util.ENUM_SEED = Math.random();


/**
 * Clones an object
 *
 * @param {*} value Value to clone.
 * @return {*} Copy of an object.
 */
util.clone = function(value) {
  if (value instanceof Object) {
    return util.obj.clone(value);
  }

  return value;
};


/**
 * Compares two objects
 *
 * @param {*} first Object to compare.
 * @param {*} second Object to compare.
 * @return {boolean} Result of comparison.
 */
util.equals = function(first, second) {
  if (first === second) {
    return true;
  } else if (first instanceof Object && second instanceof Object) {
    return util.obj.equals(first, second);
  }

  return false;
};


/**
 * Encodes object to JSON.
 *
 * @param {*} object The object to code.
 * @return {string} JSON string.
 */
util.encodeJson = function(object) {
  try {
    return JSON.stringify(object) || '';
  } catch (error) {
    console.warn('JSON encoding error: "' +
        error.message + '". [util.encodeJson]', object);
  }

  return '';
};


/**
 * Converts JSON to object.
 *
 * @param {string} data JSON string..
 * @return {*} JSON object.
 */
util.decodeJson = function(data) {
  try {
    if (data !== '') {
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('JSON parsing error: "' +
        error.message + '". [util.decodeJson]', data);
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
util.encodeBase64 = function(string, opt_forUrl) {
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
util.decodeBase64 = function(string, opt_forUrl) {
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
util.encodeFormData = function(object, opt_separator) {
  return util.__splitUrlData(object).join(opt_separator || '&');
};


/**
 * Converts string in x-www-form-urlencoded to object.
 *
 * @param {string} formData String in x-www-form-urlencoded.
 * @param {string=} opt_separator Separator for name/value pairs.
 * @return {!Object} Decoded object.
 */
util.decodeFormData = function(formData, opt_separator) {
  var result = new util.obj.SafeObject({});

  var values = formData.split(opt_separator || '&');
  var i = 0,
      l = values.length;

  while (i < l) {
    var ind = values[i].indexOf('=');
    var key = values[i].substr(0, ind);
    var value = values[i].substr(ind + 1, values[i].length);

    if (value !== '') {
      result.setByPath(util.unescape(value),
          util.__parseFormDataToken(key));
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
util.escape = function(url) {
  return encodeURIComponent(url);
};


/**
 * Decodes special characters in url.
 *
 * @param {string} url URL-string.
 * @return {string} Decoded string.
 */
util.unescape = function(url) {
  try {
    return decodeURIComponent(url);
  } catch (error) {
    console.warn('Malformed url: "' + url + '". [util.unescape]');
  }

  return '';
};


/**
 * @param {string} token Element of path in x-www-form-urlencoded string form.
 * @return {!Array.<string>} Generated path.
 */
util.__parseFormDataToken = function(token) {
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
util.__splitUrlData = function(object, opt_path) {
  var result = [];

  if (opt_path === undefined) {
    opt_path = [];
  }

  if (typeof object === 'object') {
    for (var key in object) {
      var newPath = opt_path.length === 0 ?
          [key] : (opt_path.join(',') + ',' + key).split(',');

      result = result.concat(util.__splitUrlData(object[key], newPath));
    }
  } else {
    result = [
      opt_path.shift() +
          (opt_path.length > 0 ? '[' + opt_path.join('][') + ']=' : '=') +
          util.escape(String(object))
    ];
  }

  return result;
};


/**
 * Removes whitespace from both sides of a string.
 *
 * @param {string} string String.
 * @return {string} Trimmed string.
 */
util.trim = function(string) {
  try {
    return string.trim();
  } catch (e) {
    return string.replace(/^\s+|\s+$/g, '');
  }
};


/**
 * @param {!Object} data Data.
 * @param {string} key Data key.
 * @return {string} String.
 */
util.extractString = function(data, key) {
  if (typeof data[key] === 'string') {
    return data[key];
  }

  return '';
};


/**
 * @param {!Object} data Data.
 * @param {string} key Data key.
 * @return {number} String.
 */
util.extractNumber = function(data, key) {
  if (typeof data[key] === 'number') {
    return data[key];
  }

  return 0;
};


/**
 * @param {!Object} data Data.
 * @param {string} key Data key.
 * @return {boolean} String.
 */
util.extractBoolean = function(data, key) {
  if (typeof data[key] === 'boolean') {
    return data[key];
  }

  return false;
};


/**
 * @param {!Object} data Data.
 * @param {string} key Data key.
 * @return {!Object} String.
 */
util.extractObject = function(data, key) {
  if (data[key] instanceof Object) {
    return data[key];
  }

  return {};
};
