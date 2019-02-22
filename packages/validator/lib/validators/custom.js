"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _default = function _default(value, rule, values, name) {
  if ((0, _utils.isFn)(rule.validator)) {
    return rule.validator(value, rule, values, name);
  }
};

exports.default = _default;