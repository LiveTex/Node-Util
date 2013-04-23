

/**
 * @param {string} string
 * @param {boolean=} opt_forUrl
 * @return {string}
 */
util.base64.encodeBrowserData = function(string, opt_forUrl) {
  var result = '';

  var str = util.base64.__utfEncode(string);

  if (window.btoa !== undefined) {
    result = window.btoa(str);
  } else {
    var chr1, chr2, chr3,
        enc1, enc2, enc3, enc4;

    var i = 0;
    while (i < str.length) {

      chr1 = str.charCodeAt(i++);
      chr2 = str.charCodeAt(i++);
      chr3 = str.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      result += util.base64.__KEYS_STR.charAt(enc1) +
          util.base64.__KEYS_STR.charAt(enc2) +
          util.base64.__KEYS_STR.charAt(enc3) +
          util.base64.__KEYS_STR.charAt(enc4);

    }
  }

  if (opt_forUrl) {
    result = result.replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=+\s*$/g, '');
  }

  return result;
};


/**
 * @param {string} string
 * @param {boolean=} opt_forUrl
 * @return {string}
 */
util.base64.decodeBrowserData = function(string, opt_forUrl) {
  if (opt_forUrl) {
    string = string.replace(/-/g, '+').replace(/_/g, '/') +
        ('====').slice(0, -(string.length % 4));
  }

  var result = '';

  if (window.atob !== undefined) {
    result = window.atob(string);
  } else {
    var chr1, chr2, chr3,
        enc1, enc2, enc3, enc4;

    var i = 0;

    string = string.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < string.length) {

      enc1 = util.base64.__KEYS_STR.indexOf(string.charAt(i++));
      enc2 = util.base64.__KEYS_STR.indexOf(string.charAt(i++));
      enc3 = util.base64.__KEYS_STR.indexOf(string.charAt(i++));
      enc4 = util.base64.__KEYS_STR.indexOf(string.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      result += String.fromCharCode(chr1);

      if (enc3 != 64) {
        result += String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        result += String.fromCharCode(chr3);
      }

    }
  }

  return util.base64.__utfDecode(result);
};


/**
 * @param {string} string
 * @return {string}
 */
util.base64.__utfEncode = function(string) {
  string = string.replace(/\r\n/g, '\n');
  var utftext = '';

  for (var n = 0; n < string.length; n++) {

    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }

  return utftext;
};


/**
 * @param {string} utftext
 * @return {string}
 */
util.base64.__utfDecode = function(utftext) {
  var string = '';
  var i = 0;
  var c = 0;
  var c2 = 0;
  var c3 = 0;

  while (i < utftext.length) {

    c = utftext.charCodeAt(i);

    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));

      i += 3;
    }

  }

  return string;
};
