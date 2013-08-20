

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


//==============================================================================
// Encode - decode methods
//==============================================================================


// JSON


/**
 * Кодирование объекта в формат json.
 *
 * @param {*} object Объект кодирования.
 * @return {string} Кодированный в строку объект.
 */
util.encodeJsonData = function(object) {
  try {
    return JSON.stringify(object) || '';
  } catch (error) {
    console.error('JSON encoding error: "' +
        error.message + '". [util.encodeJsonData]', object);
  }

  return '';
};


/**
 * Конвертация json в объект.
 *
 * @param {string} data Закодированный объект.
 * @return {*} Раскодированный объект.
 */
util.decodeJsonData = function(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('JSON parsing error: "' +
        error.message + '". [util.decodeJsonData]', data);
  }

  return null;
};


// Base64


/**
 * Кодирование строки в формат base64.
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
 * Конвертация строки base64 в обычную строку.
 *
 * @param {string} string Закодированная строка.
 * @param {boolean=} opt_forUrl Флаг URL-безопасного кодирования.
 * @return {string} Строка.
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
 * Кодирование объекта в x-www-form-urlencoded форму.
 *
 * @param {!Object} object Объект кодирования.
 * @param {string=} opt_separator Разделитель.
 * @return {string} Перекодированный в строку объект.
 */
util.encodeFormData = function(object, opt_separator) {
  return util.__splitUrlData(object).join(opt_separator || '&');
};


/**
 * @param {string} formData Данные в формате x-www-form-urlencoded.
 * @param {string=} opt_separator Разделитель.
 * @return {!Object} Результат распарсинга.
 */
util.decodeFormData = function(formData, opt_separator) {
  var result = new util.object.SafeObject({});

  var values = formData.split(opt_separator || '&');
  var i = 0,
      l = values.length;

  var pair = [];
  while (i < l) {
    pair = values[i].split('=');

    if (pair[1] !== undefined) {
      result.setByPath(util.unescape(pair[1]),
          util.__parseFormDataToken(pair[0]));
    }

    i++;
  }

  return result.getCore();
};


/**
 * Кодирование строки url.
 *
 * @param {string} url Строка URL.
 * @return {string} Закодированная строка.
 */
util.escape = function(url) {
  return encodeURIComponent(url);
};


/**
 * Декодирование строки url.
 *
 * @param {string} url Строка URL.
 * @return {string} Раскодированная строка.
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
 * @param {string} token Элемент пути значения x-www-form-urlencoded строки.
 * @return {!Array.<string>} Разбитый путь.
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
 * @param {!Object} object Объект кодирования.
 * @param {!Array.<string>=} opt_path Путь к элементарной единице данных.
 * @return {Array} Массив элементарных данных составляющих объект.
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
 * Поиск индекса объекта в массиве.
 *
 * @param {*} element Объект поиска.
 * @param {!Array} array Массив.
 * @return {number} Индекс найденного элемента.
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
 * Создание массива уникальных строк.
 *
 * @param {!Array.<string>} set Массив строк.
 * @return {!Array.<string>} Массив уникальных строк.
 */
util.unique = function(set) {
  var result = {};
  for (var i = 0, l = set.length; i < l; i += 1) {
    result[set[i]] = true;
  }
  return Object.keys(result) || [];
};


/**
 * Создание таблицы ключ-значение.
 *
 * @param {!Array.<string>} keys Ключи.
 * @param {!Array} values Значения.
 * @return {!Object} Таблица.
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
 * Заполнение массива данными.
 *
 * @param {!Array.<*>} array Массив.
 * @param {*} value Значение.
 * @return {!Array.<*>} Заполненный массив.
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
 * Создание массива.
 *
 * @param {number} length Размер массива.
 * @param {*=} opt_defaultValue Значение по-умолчанию.
 * @return {!Array.<*>} Массив.
 */
util.createArray = function(length, opt_defaultValue) {
  var defaultValue = null;
  if (opt_defaultValue !== undefined) {
    defaultValue = opt_defaultValue;
  }
  return util.fill(new Array(length), defaultValue);
};


/**
 * Клонирование массива.
 *
 * @param {!Array} array Массив.
 * @return {!Array} Копия массива.
 */
util.cloneArray = function(array) {
  return array.slice(0);
};


/**
 * Преобразование объекта в массив.
 *
 * @param {!Object} list Объект похожий на массив.
 * @return {!Array} Массив.
 */
util.toArray = function(list) {
  return Array.prototype.slice.call(list);
};


/**
 * Преобразование элементов массива к строке.
 *
 * @param {!Array} array Массив.
 * @return {!Array.<string>} Массив строк.
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
 * преоюразование массива в массив объектов.
 *
 * @param {!Array} array Массив.
 * @return {!Array.<!Object>} Массив объектов.
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
 * Возвращает произвольный элемент списка.
 *
 * @param {!Array.<*>} items Массив.
 * @param {function(*)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
util.getRandomItem = function(items, complete, cancel) {
  complete(items[Math.floor(Math.random() * items.length)] || null);
};


//==============================================================================
// Object methods
//==============================================================================


/**
 * Создание безопасного объекта.
 *
 * @param {Object} obj Объект.
 * @return {!util.object.SafeObject} Безопаснй объект.
 */
util.safe = function(obj) {
  return new util.object.SafeObject(obj || {});
};


/**
 * Клонирование объекта.
 *
 * @param {*} object Объект.
 * @return {*} Копия объекта.
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
 * Слияние двух объектов.
 *
 * @param {!Object} base Базовый объект.
 * @param {!Object} target Объект для наложения на базовый.
 * @param {number=} opt_depth Глубина слияния.
 * @return {!Object} Результат слияния.
 */
util.merge = function(base, target, opt_depth) {
  if (undefined === opt_depth) {
    opt_depth = 0;
  }
  for (var key in target) {
    var baseIsObject = base[key] instanceof Object;
    var targetIsObject = target[key] instanceof Object;
    var optDepthIsZero = opt_depth !== 0;
    if (baseIsObject && targetIsObject && optDepthIsZero) {
      base[key] = util.merge(base[key], target[key], opt_depth - 1);
    } else {
      base[key] = target[key];
    }
  }
  return base;
};


/**
 * Слияние двух объектов.
 *
 * @param {!Object} base Базовый объект.
 * @param {!Object} target Объект для наложения на базовый.
 * @return {!Object} Результат слияния.
 */
util.mergeRecursive = function(base, target) {
  return util.merge(base, target, Infinity);
};


/**
 * Сравнение двух объектов.
 *
 * @param {Object} first Объект для сравнения.
 * @param {Object} second Другой объект для сравнения.
 * @return {boolean} Результат сравнения.
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
 * Привязывание определенного контекста к функции или методу.
 *
 * @param {!Function} func Функция.
 * @param {Object} context Контекст.
 * @return {!Function} Привязанная к контексту функция.
 */
util.bind = function(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
};


/**
 * Генерация случайного числа.
 *
 * @param {number} threshold Граница.
 * @return {number} Случайное число.
 */
util.getRandomNumber = function(threshold) {
  return Math.floor(threshold * Math.random());
};


/**
 * Алгоритм хеширования.
 *
 * @param {string} str Строка для хеширования.
 * @param {number} seed Случайное зерно.
 * @return {number} Результат хеширования.
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


/**
 * Преобразование к числу.
 *
 * @param {string} number Число в строковой форме.
 * @return {number} Полученное число.
 */
util.parseInt = function(number) {
  return parseInt(number, 10);
};






