"use strict";

var _react = require("@uform/react");

var _next = require("@alifd/next");

var _utils = require("../utils");

var RadioGroup = _next.Radio.Group;
(0, _react.registerFormField)('radio', (0, _react.connect)({
  getProps: _utils.mapStyledProps,
  getComponent: _utils.mapTextComponent
})(RadioGroup));