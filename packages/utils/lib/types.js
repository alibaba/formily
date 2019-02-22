"use strict";

exports.__esModule = true;
exports.isRegExp = exports.isObj = exports.isStr = exports.isPlainObj = exports.isArr = exports.isFn = void 0;

var isType = function isType(type) {
  return function (obj) {
    return obj != null && Object.prototype.toString.call(obj) === "[object " + type + "]";
  };
};

var isFn = isType('Function');
exports.isFn = isFn;
var isArr = Array.isArray || isType('Array');
exports.isArr = isArr;
var isPlainObj = isType('Object');
exports.isPlainObj = isPlainObj;
var isStr = isType('String');
exports.isStr = isStr;

var isObj = function isObj(val) {
  return typeof val === 'object';
};

exports.isObj = isObj;
var isRegExp = isType('RegExp');
exports.isRegExp = isRegExp;