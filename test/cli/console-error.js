

var util = require('../../bin/index.js');
var logger = new util.cli.Logger();
logger.setConsole(console);

function anotherFunctionName() {
  console.error('yoo');
}


/**
 * @param {string} f param.
 */
var conError = function(f) {
  console.error(f);
};


/**
 * @namespace
 */
var ss = {};


/**
 * @constructor
 */
ss.ClassNameSome = function() {
  console.error('class constructor error');
  conError('func in constructor');
};


/**
 * @param {string} o some param.
 */
ss.ClassNameSome.prototype.func = function(o) {
  console.error('error with ' + o)
};


console.error('shit happened at blahblhag#sdgfg');
console.warn('another log');
anotherFunctionName();
console.info('infoooo!!');

var s = new ss.ClassNameSome();
console.log('just log');
s.func('dfdf');