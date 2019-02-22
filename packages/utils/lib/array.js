"use strict";

exports.__esModule = true;
exports.includes = exports.find = exports.findIndex = exports.some = exports.every = exports.reduce = exports.map = exports.each = exports.toArr = void 0;

var _types = require("./types");

var toArr = function toArr(val) {
  return (0, _types.isArr)(val) ? val : val ? [val] : [];
};

exports.toArr = toArr;

var each = function each(val, callback, revert) {
  if ((0, _types.isArr)(val)) {
    if (revert) {
      for (var i = val.length - 1; i >= 0; i--) {
        if (callback(val[i], i) === false) {
          return;
        }
      }
    } else {
      for (var _i = 0, length = val.length; _i < length; _i++) {
        if (callback(val[_i], _i) === false) {
          return;
        }
      }
    }
  } else {
    for (var key in val) {
      if (Object.hasOwnProperty.call(val, key)) {
        if (callback(val[key], key) === false) {
          return;
        }
      }
    }
  }
};

exports.each = each;

var map = function map(val, callback, revert) {
  var res = (0, _types.isArr)(val) ? [] : {};
  each(val, function (item, key) {
    var value = callback(item, key);

    if ((0, _types.isArr)(res)) {
      res.push(value);
    } else {
      res[key] = value;
    }
  }, revert);
  return res;
};

exports.map = map;

var reduce = function reduce(val, callback, initial, revert) {
  var res = initial;
  each(val, function (item, key) {
    res = callback(res, item, key);
  }, revert);
  return res;
};

exports.reduce = reduce;

var every = function every(val, callback, revert) {
  var res = false;
  each(val, function (item, key) {
    if (!callback(item, key)) {
      res = false;
      return false;
    } else {
      res = true;
    }
  }, revert);
  return res;
};

exports.every = every;

var some = function some(val, callback, revert) {
  var res = true;
  each(val, function (item, key) {
    if (callback(item, key)) {
      res = true;
      return false;
    } else {
      res = false;
    }
  }, revert);
  return res;
};

exports.some = some;

var findIndex = function findIndex(val, callback, revert) {
  var res = -1;
  each(val, function (item, key) {
    if (callback(item, key)) {
      res = key;
      return false;
    }
  }, revert);
  return res;
};

exports.findIndex = findIndex;

var find = function find(val, callback, revert) {
  var res;
  each(val, function (item, key) {
    if (callback(item, key)) {
      res = item;
      return false;
    }
  }, revert);
  return res;
};

exports.find = find;

var includes = function includes(val, searchElement, revert) {
  return some(val, function (item) {
    return item === searchElement;
  }, revert);
};

exports.includes = includes;