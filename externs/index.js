 

/**
 * @type {string}
 */
util.VERSION = '0.0.1';

/**
 * @namespace
 */
util.object = {};

/**
 * Кодирование объекта в формат json.
 *
 * @param {*} object Объект кодирования.
 * @return {string} Кодированный в строку объект.
 */
util.encodeJsonData = function(object) {};

/**
 * Конвертация json в объект.
 *
 * @param {string} data Закодированный объект.
 * @return {*} Раскодированный объект.
 */
util.decodeJsonData = function(data) {};

/**
 * Кодирование строки в формат base64.
 *
 * @param {string} string Строка.
 * @param {boolean=} opt_forUrl Флаг URL-безопасного кодирования.
 * @return {string} Закодированная строка.
 */
util.encodeBase64 = function(string, opt_forUrl) {};

/**
 * Конвертация строки base64 в обычную строку.
 *
 * @param {string} string Закодированная строка.
 * @param {boolean=} opt_forUrl Флаг URL-безопасного кодирования.
 * @return {string} Строка.
 */
util.decodeBase64 = function(string, opt_forUrl) {};

/**
 * Кодирование объекта в x-www-form-urlencoded форму.
 *
 * @param {!Object} object Объект кодирования.
 * @return {string} Перекодированный в строку объект.
 */
util.encodeFormData = function(object) {};

/**
 * Декодирование x-www-form-urlencoded формы в объект.
 *
 * @param {string} data Закодированный объект.
 * @return {!Object} Раскодированный объект.
 */
util.decodeFormData = function(data) {};

/**
 * Кодирование строки url.
 *
 * @param {string} url Строка URL.
 * @return {string} Закодированная строка.
 */
util.escape = function(url) {};

/**
 * Декодирование строки url.
 *
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
 * Создание массива уникальных строк.
 *
 * @param {!Array.<string>} set Массив строк.
 * @return {!Array.<string>} Массив уникальных строк.
 */
util.unique = function(set) {};

/**
 * Создание таблицы ключ-значение.
 *
 * @param {!Array.<string>} keys Ключи.
 * @param {!Array} values Значения.
 * @return {!Object} Таблица.
 */
util.glue = function(keys, values) {};

/**
 * Заполнение массива данными.
 *
 * @param {!Array.<*>} array Массив.
 * @param {*} value Значение.
 * @return {!Array.<*>} Заполненный массив.
 */
util.fill = function(array, value) {};

/**
 * Создание массива.
 *
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
 * Преобразование объекта в массив.
 *
 * @param {!Object} list Объект похожий на массив.
 * @return {!Array} Массив.
 */
util.toArray = function(list) {};

/**
 * Преобразование элементов массива к строке.
 *
 * @param {!Array} array Массив.
 * @return {!Array.<string>} Массив строк.
 */
util.toStringArray = function(array) {};

/**
 * преоюразование массива в массив объектов.
 *
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
 * Создание безопасного объекта.
 *
 * @param {Object} obj Объект.
 * @return {!util.object.SafeObject} Безопаснй объект.
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
 * Слияние двух объектов.
 *
 * @param {!Object} base Базовый объект.
 * @param {!Object} target Объект для наложения на базовый.
 */
util.merge = function(base, target) {};

/**
 * Сравнение двух объектов.
 *
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
 * Генерация случайного числа.
 *
 * @param {number} threshold Граница.
 * @return {number} Случайное число.
 */
util.getRandomNumber = function(threshold) {};

/**
 * Алгоритм хеширования.
 *
 * @param {string} str Строка для хеширования.
 * @param {number} seed Случайное зерно.
 * @return {number} Результат хеширования.
 */
util.hashMurmur = function(str, seed) {};

/**
 * Преобразование к числу.
 *
 * @param {string} number Число в строковой форме.
 * @return {number} Полученное число.
 */
util.parseInt = function(number) {};

/**
 * @constructor
 * @param {!Object} data Исходные данные.
 */
util.object.SafeObject = function(data) {};

/**
 * @return {!Object} Исходные данные.
 */
util.object.SafeObject.prototype.getCore = function() {};

/**
 * @param {...(string|number)} var_keys Путь к значению.
 * @return {string|number|boolean|Object} Данные.
 */
util.object.SafeObject.prototype.get = function(var_keys) {};

/**
 * @param {string|number|boolean|Object} value Данные.
 * @param {...(string|number)} var_keys Путь к значению.
 */
util.object.SafeObject.prototype.set = function(value, var_keys) {};

/**
 * @param {!Array.<(string|number)>} path Путь к значению.
 * @return {string|number|boolean|Object} Данные.
 */
util.object.SafeObject.prototype.getByPath = function(path) {};

/**
 * @param {string|number|boolean|Object} value Данные.
 * @param {!Array.<(string|number)>} path Путь к значению.
 */
util.object.SafeObject.prototype.setByPath = function(value, path) {};

/**
 * @constructor
 */
util.object.ArrayCache = function() {};

/**
 * @param {string} key Ключ.
 * @return {!Array} Данные.
 */
util.object.ArrayCache.prototype.get = function(key) {};

/**
 * @param {string} key Ключ.
 * @param {!Array} data Данные.
 * @param {number} timeout Ключ.
 */
util.object.ArrayCache.prototype.set = function(key, data, timeout) {};

/**
 * @param {string} key Ключ поля.
 */
util.object.ArrayCache.prototype.remove = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {boolean} Наличие ключа.
 */
util.object.ArrayCache.prototype.has = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {number} Время жизни ключа.
 */
util.object.ArrayCache.prototype.ttl = function(key) {};

/**
 * @constructor
 */
util.object.ObjectCache = function() {};

/**
 * @param {string} key Ключ.
 * @return {Object} Данные.
 */
util.object.ObjectCache.prototype.get = function(key) {};

/**
 * @param {string} key Ключ.
 * @param {!Object} data Данные.
 * @param {number} timeout Ключ.
 */
util.object.ObjectCache.prototype.set = function(key, data, timeout) {};

/**
 * @param {string} key Ключ поля.
 */
util.object.ObjectCache.prototype.remove = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {boolean} Наличие ключа.
 */
util.object.ObjectCache.prototype.has = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {number} Время жизни ключа.
 */
util.object.ObjectCache.prototype.ttl = function(key) {};

/**
 * @constructor
 */
util.object.StringCache = function() {};

/**
 * @param {string} key Ключ.
 * @return {string} Данные.
 */
util.object.StringCache.prototype.get = function(key) {};

/**
 * @param {string} key Ключ.
 * @param {string} data Данные.
 * @param {number} timeout Ключ.
 */
util.object.StringCache.prototype.set = function(key, data, timeout) {};

/**
 * @param {string} key Ключ поля.
 */
util.object.StringCache.prototype.remove = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {boolean} Наличие ключа.
 */
util.object.StringCache.prototype.has = function(key) {};

/**
 * @param {string} key Ключ поля.
 * @return {number} Время жизни ключа.
 */
util.object.StringCache.prototype.ttl = function(key) {};


