 

/**
 * @type {string}
 */
util.VERSION = '0.0.1';

/**
 * @namespace
 */
util.async = {};

/**
 * @namespace
 */
util.cache = {};

/**
 * @param {Object} object Объект кодирования.
 * @return {string} Кодированный в строку объект.
 */
util.encodeJsonData = function(object) {};

/**
 * @param {string} data Закодированный объект.
 * @return {*} Раскодированный объект.
 */
util.decodeJsonData = function(data) {};

/**
 * @param {string} string Строка.
 * @param {boolean=} opt_forUrl Флаг URL-безопасного кодирования.
 * @return {string} Закодированная строка.
 */
util.encodeBase64Data = function(string, opt_forUrl) {};

/**
 * @param {string} string Закодированная строка.
 * @param {boolean=} opt_forUrl Флаг URL-безопасного кодирования.
 * @return {string} Строка.
 */
util.decodeBase64Data = function(string, opt_forUrl) {};

/**
 * Кодирование объекта в x-www-form-urlencoded форму.
 *
 * @param {!Object} object Объект кодирования.
 * @return {string} Перекодированный в строку объект.
 */
util.encodeFormData = function(object) {};

/**
 * @param {string} data Закодированный объект.
 * @return {*} Раскодированный объект.
 */
util.decodeFormData = function(data) {};

/**
 * @param {string} url Строка URL.
 * @return {string} Закодированная строка.
 */
util.escape = function(url) {};

/**
 * @param {string} url Строка URL.
 * @return {string} Раскодированная строка.
 */
util.unescape = function(url) {};

/**
 * Поиск индекса объекта в массиве.
 *
 * @param {*} element Объект поиска.
 * @param {!Array} array Массив.
 * @return {number} Индекс найденного элемента.
 */
util.indexOf = function(element, array) {};

/**
 * @param {!Array.<string>} set Массив строк.
 * @return {!Array.<string>} Массив уникальных строк.
 */
util.unique = function(set) {};

/**
 * @param {!Array.<string>} keys Ключи.
 * @param {!Array} values Значения.
 * @return {!Object} Таблица.
 */
util.glue = function(keys, values) {};

/**
 * @param {!Array.<*>} array Массив.
 * @param {*} value Значение.
 * @return {!Array.<*>} Заполненный маччив.
 */
util.fill = function(array, value) {};

/**
 * @param {number} length Размер массива.
 * @param {*=} opt_defaultValue Значение по-умолчанию.
 * @return {!Array.<*>} Массив.
 */
util.createArray = function(length, opt_defaultValue) {};

/**
 * Клонирование массива.
 *
 * @param {!Array} array Массив.
 * @return {!Array} Копия массива.
 */
util.cloneArray = function(array) {};

/**
 * @param {!Object} list Объект похожий на массив.
 * @return {!Array} Массив.
 */
util.toArray = function(list) {};

/**
 * @param {!Array} array Массив.
 * @return {!Array.<string>} Массив строк.
 */
util.toStringArray = function(array) {};

/**
 * @param {!Array} array Массив.
 * @return {!Array.<!Object>} Массив объектов.
 */
util.toObjectArray = function(array) {};

/**
 * Возвращает произвольный элемент списка.
 *
 * @param {!Array.<*>} items Массив.
 * @param {function(*)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
util.getRandomItem = function(items, complete, cancel) {};

/**
 * @param {Object} obj Объект.
 * @return {!util.SafeObject} Безопаснй объект.
 */
util.safe = function(obj) {};

/**
 * Клонирование объекта.
 *
 * @param {*} object Объект.
 * @return {*} Копия объекта.
 */
util.clone = function(object) {};

/**
 * @param {!Object} base Базовый объект.
 * @param {!Object} target Объект для наложения на базовый.
 */
util.merge = function(base, target) {};

/**
 * @param {Object} first Объект для сравнения.
 * @param {Object} second Другой объект для сравнения.
 * @return {boolean} Результат сравнения.
 */
util.areEqual = function(first, second) {};

/**
 * Привязывание определенного контекста к функции или методу.
 *
 * @param {!Function} func Функция.
 * @param {Object} context Контекст.
 * @return {!Function} Привязанная к контексту функция.
 */
util.bind = function(func, context) {};

/**
 * @param {number} threshold Граница.
 * @return {number} Случайное число.
 */
util.getRandomNumber = function(threshold) {};

/**
 * @param {string} str Строка для хеширования.
 * @param {number} seed Случайное зерно.
 * @return {number} Результат хеширования.
 */
util.hashMurmur = function(str, seed) {};

/**
 * @param {string} number Число в строковой форме.
 * @return {number} Полученное число.
 */
util.parseInt = function(number) {};

/**
 * @constructor
 * @param {!Object} data Исходные данные.
 */
util.SafeObject = function(data) {};

/**
 * @return {!Object} Исходные данные.
 */
util.SafeObject.prototype.getCore = function() {};

/**
 * @param {...(string|number)} var_keys Путь к значению.
 * @return {string|number|boolean|Object} Данные.
 */
util.SafeObject.prototype.get = function(var_keys) {};

/**
 * @param {string|number|boolean|Object} value Данные.
 * @param {...(string|number)} var_keys Путь к значению.
 */
util.SafeObject.prototype.set = function(value, var_keys) {};

/**
 * @param {!Array.<(string|number)>} path Путь к значению.
 * @return {string|number|boolean|Object} Данные.
 */
util.SafeObject.prototype.getByPath = function(path) {};

/**
 * @param {string|number|boolean|Object} value Данные.
 * @param {!Array.<(string|number)>} path Путь к значению.
 */
util.SafeObject.prototype.setByPath = function(value, path) {};

/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {string} Результат.
 */
util.SafeObject.prototype.getString = function(var_keys) {};

/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {number} Результат.
 */
util.SafeObject.prototype.getNumber = function(var_keys) {};

/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {boolean} Результат.
 */
util.SafeObject.prototype.getBoolean = function(var_keys) {};

/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {Object} Результат.
 */
util.SafeObject.prototype.getObject = function(var_keys) {};

/**
 * @param {...(string|number)} var_keys Путь к данным.
 * @return {!Array} Результат.
 */
util.SafeObject.prototype.getArray = function(var_keys) {};

/**
 * Возвращает произвольный элемент списка.
 *
 * @param {!Array} array Массив.
 * @param {function(!Array)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
util.async.randomizeArray = function(array, complete, cancel) {};

/**
 * Возвращает произвольный элемент списка.
 *
 * @param {!Array.<*>} items Массив.
 * @param {function(*)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
util.async.getRandomItem = function(items, complete, cancel) {};

/**
 * @param {number} delay Время.
 * @return {function(*, !Function,
 * function(string, number=))} Операция задержки.
 */
util.async.delayActor = function(delay) {};

/**
 * @param {string} name Имя.
 * @return {function(*, !Function,
 * function(string, number=))} Операция задержки.
 */
util.async.timeMeasureStartActor = function(name) {};

/**
 * @param {string} name Имя.
 * @return {function(*, !Function,
 * function(string, number=))} Операция задержки.
 */
util.async.timeMeasureStopActor = function(name) {};

/**
 * @constructor
 */
util.cache.ArrayCache = function() {};

/**
 * @param {string} key Ключ.
 * @return {!Array} Данные.
 */
util.cache.ArrayCache.prototype.get = function(key) {};

/**
 * @param {string} key Ключ.
 * @param {!Array} data Данные.
 * @param {number} timeout Ключ.
 */
util.cache.ArrayCache.prototype.set = function(key, data, timeout) {};

/**
 * @param {string} key Ключ поля.
 */
util.cache.ArrayCache.prototype.remove = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {boolean} Наличие ключа.
 */
util.cache.ArrayCache.prototype.has = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {number} Время жизни ключа.
 */
util.cache.ArrayCache.prototype.ttl = function(key) {};

/**
 * @constructor
 */
util.cache.ObjectCache = function() {};

/**
 * @param {string} key Ключ.
 * @return {Object} Данные.
 */
util.cache.ObjectCache.prototype.get = function(key) {};

/**
 * @param {string} key Ключ.
 * @param {!Object} data Данные.
 * @param {number} timeout Ключ.
 */
util.cache.ObjectCache.prototype.set = function(key, data, timeout) {};

/**
 * @param {string} key Ключ поля.
 */
util.cache.ObjectCache.prototype.remove = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {boolean} Наличие ключа.
 */
util.cache.ObjectCache.prototype.has = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {number} Время жизни ключа.
 */
util.cache.ObjectCache.prototype.ttl = function(key) {};

/**
 * @constructor
 */
util.cache.StringCache = function() {};

/**
 * @param {string} key Ключ.
 * @return {string} Данные.
 */
util.cache.StringCache.prototype.get = function(key) {};

/**
 * @param {string} key Ключ.
 * @param {string} data Данные.
 * @param {number} timeout Ключ.
 */
util.cache.StringCache.prototype.set = function(key, data, timeout) {};

/**
 * @param {string} key Ключ поля.
 */
util.cache.StringCache.prototype.remove = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {boolean} Наличие ключа.
 */
util.cache.StringCache.prototype.has = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {number} Время жизни ключа.
 */
util.cache.StringCache.prototype.ttl = function(key) {};


