"use strict";

var _react = require("@uform/react");

var _next = require("@alifd/next");

var _utils = require("../utils");

(0, _react.registerFormField)('time', (0, _react.connect)({
  getProps: _utils.mapStyledProps,
  getComponent: _utils.mapTextComponent
})(_next.TimePicker));