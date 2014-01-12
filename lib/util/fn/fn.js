

/**
 * Binds a function to a certain context.
 *
 * @param {!Function} fn Function to bind.
 * @param {Object} context Context.
 * @return {!Function} Binded function.
 */
util.fn.bind = function(fn, context) {
  return function() {
    return fn.apply(context, arguments);
  };
};
