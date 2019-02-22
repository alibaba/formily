"use strict";

exports.__esModule = true;
exports.clone = void 0;

var _types = require("./types");

var self = void 0 || global || window;
var NATIVE_KEYS = [['Map', function (map) {
  return new Map(map);
}], ['WeakMap', function (map) {
  return new WeakMap(map);
}], ['WeakSet', function (set) {
  return new WeakSet(set);
}], ['Set', function (set) {
  return new Set(set);
}], 'FileList', 'File', 'URL', ['Promise', function (promise) {
  return new Promise(function (resolve, reject) {
    return promise.then(resolve, reject);
  });
}]];

var isNativeObject = function isNativeObject(values) {
  for (var i = 0; i < NATIVE_KEYS.length; i++) {
    var item = NATIVE_KEYS[i];

    if (Array.isArray(item) && item[0]) {
      if (self[item[0]] && values instanceof self[item[0]]) {
        return item[1] ? item[1] : item[0];
      }
    } else {
      if (self[item] && values instanceof self[item]) {
        return item;
      }
    }
  }
};

var clone = function clone(values, filter) {
  var _nativeClone;

  if (Array.isArray(values)) {
    return values.map(function (item) {
      return clone(item, filter);
    });
  } else if (_nativeClone = isNativeObject(values)) {
    return (0, _types.isFn)(_nativeClone) ? _nativeClone(values) : values;
  } else if (typeof values === 'object' && !!values) {
    if ('$$typeof' in values && '_owner' in values) {
      return values;
    }

    var res = {};

    for (var key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        if ((0, _types.isFn)(filter)) {
          if (filter(values[key], key)) {
            res[key] = clone(values[key], filter);
          } else {
            res[key] = values[key];
          }
        } else {
          res[key] = clone(values[key], filter);
        }
      }
    }

    return res;
  } else {
    return values;
  }
};

exports.clone = clone;