"use strict";

var _react = require("@uform/react");

var _next = require("@alifd/next");

var _utils = require("../utils");

var CheckboxGroup = _next.Checkbox.Group;
(0, _react.registerFormField)('checkbox', (0, _react.connect)({
  getProps: _utils.mapStyledProps,
  getComponent: _utils.mapTextComponent
})(CheckboxGroup));