"use strict";

var _react = require("uform/react");

var _antd = require("antd");

var _utils = require("../utils");

var CheckboxGroup = _antd.Checkbox.Group;
(0, _react.registerFormField)('checkbox', (0, _react.connect)({
  getProps: _utils.mapLoadingProps,
  getComponent: _utils.mapTextComponent
})((0, _utils.transformDataSourceKey)(CheckboxGroup, 'options')));