

/**
 * @typedef {*}
 */
util.io.Entity;


/**
 * @typedef {*}
 */
util.io.EncodingType;


/**
 * @typedef {?function(util.io.Entity, !util.io.EncodingType):util.io.Entity}
 */
util.io.Encoder;


/**
 * @typedef {?function(util.io.Entity, !util.io.EncodingType,
 *     !util.io.ICache):!util.io.DecodeResult}
 */
util.io.Decoder;


/**
 * @typedef {?function(util.io.Entity):util.io.Entity}
 */
util.io.SimpleDecoder;


/**
 * @typedef {*}
 */
util.io.DecodeError;


/**
 * @type {number}
 */
util.io.NOP = util.ENUM_SEED++;


/**
 * @type {number}
 */
util.io.JSON = util.ENUM_SEED++;


/**
 * @type {number}
 */
util.io.FORM = util.ENUM_SEED++;


/**
 * @type {number}
 */
util.io.BASE64 = util.ENUM_SEED++;


/**
 * @type {number}
 */
util.io.ESCAPE = util.ENUM_SEED++;


/**
 * @param {!util.io.EncodingType} type Тип кодирования.
 * @param {!util.io.Decoder} encoder Кодировщик.
 */
util.io.registerDecoder = function(type, encoder) {
  util.io.__decoders[type] = encoder;
};


/**
 * @param {!util.io.EncodingType} type Тип кодирования.
 * @param {!util.io.SimpleDecoder} encoder Кодировщик.
 */
util.io.registerSimpleDecoder = function(type, encoder) {
  util.io.__simpleDecoders[type] = encoder;
};


/**
 * @param {util.io.Entity} target Закодированные экземпляры.
 * @param {!util.io.EncodingType} type Тип кодирования.
 * @param {!util.io.ICache} cache Кеш экземпляров.
 * @return {!util.io.DecodeResult} Раскодированные экземпляры.
 */
util.io.decode = function(target, type, cache) {
  if (type === util.io.NOP) {
    return new util.io.DecodeResult(target);
  }

  if (type === util.io.JSON && typeof target === 'string') {
    return new util.io.DecodeResult(util.io.decodeJson(target));
  }

  if (type === util.io.FORM && typeof target === 'string') {
    return new util.io.DecodeResult(util.io.decodeFormData(target));
  }

  if (type === util.io.BASE64 && typeof target === 'string') {
    return new util.io.DecodeResult(util.io.decodeBase64(target));
  }

  if (type === util.io.ESCAPE && typeof target === 'string') {
    return new util.io.DecodeResult(util.io.unescape(target));
  }

  var decoder = util.io.__decoders[type];
  if (decoder !== undefined) {
    return decoder(target, type, cache);
  }

  var simpleDecoder = util.io.__simpleDecoders[type];
  if (simpleDecoder !== undefined) {
    return new util.io.DecodeResult(simpleDecoder(target));
  }

  return new util.io.DecodeResult(null);
};


/**
 * @param {util.io.Entity} target Закодированные экземпляры.
 * @param {!util.io.EncodingType} type Тип кодирования.
 * @param {!util.io.ICache} cache Кеш экземпляров.
 * @return {util.io.Entity}
 */
util.io.decodeEntity = function(target, type, cache) {
  return util.io.decode(target, type, cache).getEntity();
};


/**
 * @param {util.io.Entity} target Закодированные экземпляры.
 * @param {!util.io.EncodingType} type Тип кодирования.
 * @param {!util.io.ICache} cache Кеш экземпляров.
 * @return {!Array.<!util.io.Entity>}
 */
util.io.decodeEntities = function(target, type, cache) {
  return util.io.decode(target, type, cache).getEntities();
};


/**
 * @param {!util.io.EncodingType} type Тип кодирования.
 * @param {!util.io.Encoder} encoder Кодировщик.
 */
util.io.registerEncoder = function(type, encoder) {
  util.io.__encoders[type] = encoder;
};


/**
 * @param {util.io.Entity} target Раскодированный экземпляр.
 * @param {!util.io.EncodingType} type Тип кодирования.
 * @return {util.io.Entity} Закодированные экземпляры.
 */
util.io.encode = function(target, type) {
  if (type === util.io.NOP) {
    return target;
  }

  if (type === util.io.JSON) {
    return util.io.encodeJson(target);
  }

  if (type === util.io.FORM && target instanceof Object) {
    return util.io.encodeFormData(target);
  }

  if (type === util.io.BASE64 && typeof target === 'string') {
    return util.io.encodeBase64(target);
  }

  if (type === util.io.ESCAPE && typeof target === 'string') {
    return util.io.escape(target);
  }

  var encoder = util.io.__encoders[type];
  if (encoder !== undefined) {
    return encoder(target, type);
  }

  return null;
};


/**
 * Encodes object to JSON.
 *
 * @param {*} object The object to code.
 * @return {string} JSON string.
 */
util.io.encodeJson = function(object) {
  try {
    return JSON.stringify(object) || '';
  } catch (error) {
    console.warn('JSON encoding error: "' + error.message + '".', object);
  }

  return '';
};


/**
 * Converts JSON to object.
 *
 * @param {string} data JSON string..
 * @return {*} JSON object.
 */
util.io.decodeJson = function(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.warn('JSON parsing error: "' + error.message + '".', data);
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
util.io.encodeBase64 = function(string, opt_forUrl) {
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
util.io.decodeBase64 = function(string, opt_forUrl) {
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
util.io.encodeFormData = function(object, opt_separator) {
  return util.io.__splitUrlData(object).join(opt_separator || '&');
};


/**
 * Converts string in x-www-form-urlencoded to object.
 *
 * @param {string} formData String in x-www-form-urlencoded.
 * @param {string=} opt_separator Separator for name/value pairs.
 * @return {!Object} Decoded object.
 */
util.io.decodeFormData = function(formData, opt_separator) {
  var result = new util.obj.SafeObject({});

  var values = formData.split(opt_separator || '&');
  var i = 0,
      l = values.length;

  while (i < l) {
    var ind = values[i].indexOf('=');
    var key = values[i].substr(0, ind);
    var value = values[i].substr(ind + 1, values[i].length);

    if (value !== '') {
      result.setByPath(util.io.unescape(value),
          util.io.__parseFormDataToken(key));
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
util.io.escape = function(url) {
  return encodeURIComponent(url);
};


/**
 * Decodes special characters in url.
 *
 * @param {string} url URL-string.
 * @return {string} Decoded string.
 */
util.io.unescape = function(url) {
  try {
    return decodeURIComponent(url);
  } catch (error) {
    console.warn('Malformed url: "' + url + '".');
  }

  return '';
};


/**
 * @param {string} token Element of path in x-www-form-urlencoded string form.
 * @return {!Array.<string>} Generated path.
 */
util.io.__parseFormDataToken = function(token) {
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
util.io.__splitUrlData = function(object, opt_path) {
  var result = [];

  if (opt_path === undefined) {
    opt_path = [];
  }

  if (typeof object === 'object') {
    for (var key in object) {
      var newPath = opt_path.length === 0 ?
          [key] : (opt_path.join(',') + ',' + key).split(',');

      result = result.concat(util.io.__splitUrlData(object[key], newPath));
    }
  } else {
    result = [
      opt_path.shift() +
          (opt_path.length > 0 ? '[' + opt_path.join('][') + ']=' : '=') +
          util.io.escape(String(object))
    ];
  }

  return result;
};


/**
 * @type {!Object.<!util.io.EncodingType, !util.io.Decoder>}
 */
util.io.__decoders = {};


/**
 * @type {!Object.<!util.io.EncodingType, !util.io.SimpleDecoder>}
 */
util.io.__simpleDecoders = {};


/**
 * @type {!Object.<!util.io.EncodingType, !util.io.Encoder>}
 */
util.io.__encoders = {};
