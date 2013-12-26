

/**
 * @type {string}
 */
util.VERSION = '0.0.1';


/**
 * @namespace
 */
util.object = {};


/**
 * @namespace
 */
util.uid = {};


/**
 * @namespace
 */
util.args = {};


//==============================================================================
// Encode - decode methods
//==============================================================================


// JSON


/**
 * Encodes object to JSON.
 *
 * @param {*} object The object to code.
 * @return {string} JSON string.
 */
util.encodeJsonData = function(object) {
  try {
    return JSON.stringify(object) || '';
  } catch (error) {
    console.warn('JSON encoding error: "' +
        error.message + '". [util.encodeJsonData]', object);
  }

  return '';
};


/**
 * Converts JSON to object.
 *
 * @param {string} data JSON string..
 * @return {*} JSON object.
 */
util.decodeJsonData = function(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.warn('JSON parsing error: "' +
        error.message + '". [util.decodeJsonData]', data);
  }

  return null;
};


// Base64


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


// FormData


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
  var result = new util.SafeObject({});

  var values = formData.split(opt_separator || '&');
  var i = 0,
      l = values.length;

  while (i < l) {
    var ind = values[i].indexOf('=');
    var key = values[i].substr(0, ind);
    var value = values[i].substr(ind + 1, values[i].length);

    if (value !== '') {
      result.setByPath(util.unescape(value), util.__parseFormDataToken(key));
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
    console.error('Malformed url: "' + url + '". [util.unescape]');
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


//==============================================================================
// Array methods
//==============================================================================


/**
 * Search the index of an element in array.
 *
 * @param {*} element element to find.
 * @param {!Array} array Array containing an element.
 * @return {number} Index of element.
 */
util.indexOf = function(element, array) {
  if (array.indexOf !== undefined) {
    return array.indexOf(element);
  } else {
    var i = 0,
        l = array.length;
    while (i < l) {
      if (array[i] === element) {
        return i;
      }
      i++;
    }
  }
  return -1;
};


/**
 * Creates array of unique strings..
 *
 * @param {!Array.<string>} set Array of strings.
 * @return {!Array.<string>} Array of unique strings.
 */
util.unique = function(set) {
  var result = {};
  for (var i = 0, l = set.length; i < l; i += 1) {
    result[set[i]] = true;
  }
  return Object.keys(result) || [];
};


/**
 * Creates a key-value table.
 *
 * @param {!Array.<string>} keys Keys for a table.
 * @param {!Array} values Values for a table.
 * @return {!Object} Table.
 */
util.glue = function(keys, values) {
  var result = {};
  var i = 0,
      l = keys.length;
  while (i < l) {
    result[keys[i]] = values[i];
    i += 1;
  }
  return result;
};


/**
 * Fills array with data.
 *
 * @param {!Array.<*>} array Array to fill.
 * @param {*} value Data.
 * @return {!Array.<*>} Filled array.
 */
util.fill = function(array, value) {
  var i = 0,
      l = array.length;
  while (i < l) {
    array[i] = value;

    i += 1;
  }
  return array;
};


/**
 * Creates an array.
 *
 * @param {number} length Size of array.
 * @param {*=} opt_defaultValue Default value to set for each element of array.
 * @return {!Array.<*>} Array.
 */
util.createArray = function(length, opt_defaultValue) {
  var defaultValue = null;
  if (opt_defaultValue !== undefined) {
    defaultValue = opt_defaultValue;
  }
  return util.fill(new Array(length), defaultValue);
};


/**
 * Clones an array
 *
 * @param {!Array} array Array o clone.
 * @return {!Array} Copy of the array.
 */
util.cloneArray = function(array) {
  return array.slice(0);
};


/**
 * Converts object to array.
 *
 * @param {(null|undefined|{length: number})} list Object resembles an array.
 * @return {!Array} Array.
 */
util.toArray = function(list) {
  if (list instanceof Object) {
    return Array.prototype.slice.call(list);
  }
  return [];
};


/**
 * Converts each element of an array to string.
 *
 * @param {!Array} array Array.
 * @return {!Array.<string>} array of strings.
 */
util.toStringArray = function(array) {
  var i = 0,
      l = array.length;
  var result = new Array(l);
  while (i < l) {
    result[i] = String(array[i]);
    i += 1;
  }
  return result;
};


/**
 * Converts each element of an array to object
 *
 * @param {!Array} array Array.
 * @return {!Array.<!Object>} Array of objects.
 */
util.toObjectArray = function(array) {
  var i = 0,
      l = array.length;
  var result = new Array(l);
  while (i < l) {
    result[i] = Object(array[i]);
    i += 1;
  }
  return result;
};


/**
 * Returns random element of an array.
 *
 * @param {!Array.<*>} items Array.
 * @param {function(*)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
util.getRandomItem = function(items, complete, cancel) {
  complete(items[Math.floor(Math.random() * items.length)] || null);
};


//==============================================================================
// Object methods
//==============================================================================


/**
 * Creates an safe object
 *
 * @param {Object} obj Object.
 * @return {!util.SafeObject} Safe object.
 */
util.safe = function(obj) {
  return new util.SafeObject(obj || {});
};


/**
 * Clones an object
 *
 * @param {*} object Object to clone.
 * @return {*} Copy of an object.
 */
util.clone = function(object) {
  try {
    return JSON.parse(JSON.stringify(object));
  } catch (error) {
    console.error(error);
  }

  return null;
};


/**
 * Merges two objects.
 *
 * @param {!Object} base Base object to merge.
 * @param {!Object} target Object to merge with base object.
 * @return {!Object} Result of merging.
 */
util.merge = function(base, target) {
  for (var key in target) {
    if (typeof base[key] === 'object' && typeof target[key] === 'object') {
      base[key] = util.merge(base[key], target[key]);
    } else {
      base[key] = target[key];
    }
  }
  return base;
};


/**
 * Merges two objects recursively.
 *
 * @param {!Object} base Base object to merge.
 * @param {!Object} target Object to merge with base object.
 * @return {!Object} Result of merging.
 */
util.mergeRecursive = function(base, target) {
  return util.merge(base, target);
};


/**
 * Compares two objects
 *
 * @param {Object} first Object to compare.
 * @param {Object} second Object to compare.
 * @return {boolean} Result of comparison.
 */
util.areEqual = function(first, second) {
  try {
    return first === second || JSON.stringify(first) === JSON.stringify(second);
  } catch (error) {
    console.error(error);
  }

  return false;
};


//==============================================================================
// Other functions
//==============================================================================


/**
 * Binds a function to a certain context.
 *
 * @param {!Function} func Function to bind.
 * @param {Object} context Context.
 * @return {!Function} Binded function.
 */
util.bind = function(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
};


/**
 * Generates random number.
 *
 * @param {number} threshold A border for a number.
 * @return {number} Random number.
 */
util.getRandomNumber = function(threshold) {
  return Math.floor(threshold * Math.random());
};


/**
 * Converts string to a number.
 *
 * @param {string} number Number represented as a string.
 * @return {number} Number.
 */
util.parseInt = function(number) {
  return parseInt(number, 10);
};


/**
 * JS Implementation of MurmurHash2
 *
 * @see http://github.com/garycourt/murmurhash-js
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} str ASCII only.
 * @param {number} seed Random seed.
 * @return {number} 32-bit positive integer hash.
 */
util.hashMurmur = function(str, seed) {
  var l = str.length;
  var h = seed ^ l;
  var i = 0;
  var k = 0;

  while (l >= 4) {
    k = ((str.charCodeAt(i) & 0xff)) |
        ((str.charCodeAt(i + 1) & 0xff) << 8) |
        ((str.charCodeAt(i + 2) & 0xff) << 16) |
        ((str.charCodeAt(i + 3) & 0xff) << 24);

    k = (((k & 0xffff) * 0x5bd1e995) +
        ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

    k ^= k >>> 24;
    k = (((k & 0xffff) * 0x5bd1e995) +
        ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

    h = (((h & 0xffff) * 0x5bd1e995) +
        ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;

    l -= 4;
    i += 4;
  }

  switch (l) {
    case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1: {
      h ^= (str.charCodeAt(i) & 0xff);
      h = (((h & 0xffff) * 0x5bd1e995) +
          ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    }
  }

  h ^= h >>> 13;
  h = (((h & 0xffff) * 0x5bd1e995) +
      ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
  h ^= h >>> 15;

  return h >>> 0;
};
