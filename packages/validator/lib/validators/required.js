"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _message = require("../message");

var _default = function _default(value, rule, values, name) {
  if (rule.required) {
    return (0, _utils.isEmpty)(value) ? (0, _utils.format)(rule.message || (0, _message.getMessage)('required'), name) : '';
  }
};

exports.default = _default;