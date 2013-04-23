

/**
 * Возвращает произвольный элемент списка.
 *
 * @param {!Array} array Массив.
 * @param {function(!Array)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
util.async.randomizeArray = function(array, complete, cancel) {
  complete(util.randomizeArray(array));
};


/**
 * Возвращает произвольный элемент списка.
 *
 * @param {!Array.<*>} items Массив.
 * @param {function(*)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
util.async.getRandomItem = function(items, complete, cancel) {
  complete(items[Math.floor(Math.random() * items.length)] || null);
};


/**
 * @param {number} delay Время.
 * @return {!async.TaskFunction} Операция задержки.
 */
util.async.delayActor = function(delay) {
  return function(data, complete, cancel) {
    setTimeout(function() {
      complete(data);
    }, delay);
  }
};


/**
 * @param {string} name Имя.
 * @return {!async.TaskFunction} Операция задержки.
 */
util.async.timeMeasureStartActor = function(name) {
  return function(data, complete, cancel) {
    console.time(name);
    complete(data);
  }
};


/**
 * @param {string} name Имя.
 * @return {!async.TaskFunction} Операция задержки.
 */
util.async.timeMeasureStopActor = function(name) {
  return function(data, complete, cancel) {
    console.timeEnd(name);
    complete(data);
  }
};
