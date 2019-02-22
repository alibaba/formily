"use strict";

exports.__esModule = true;
exports.default = exports.patternValidate = void 0;

var _utils = require("../utils");

var _message = require("../message");

var patternValidate = function patternValidate(pattern, value, message) {
  if ((0, _utils.isEmpty)(value)) return '';
  var valid = (0, _utils.isFn)(pattern) ? pattern(value) : (0, _utils.isRegExp)(pattern) ? pattern.test(String(value)) : new RegExp(String(pattern)).test(String(value));
  return !valid ? message : '';
};

exports.patternValidate = patternValidate;

var _default = function _default(value, rule, values, name) {
  if (rule.pattern) {
    return patternValidate(rule.pattern, value, (0, _utils.format)(rule.message || (0, _message.getMessage)('pattern'), name, value, rule.pattern));
  }
};

exports.default = _default;