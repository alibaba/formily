"use strict";

var _react = require("@uform/react");

var _utils = require("../utils");

var _next = require("@alifd/next");

(0, _react.registerFormField)('boolean', (0, _react.connect)({
  valueName: 'checked',
  getProps: _utils.mapStyledProps
})((0, _utils.acceptEnum)(_next.Switch)));