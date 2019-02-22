"use strict";

var _react = require("@uform/react");

var _antd = require("antd");

var _utils = require("../utils");

(0, _react.registerFormField)('number', (0, _react.connect)({
  getProps: _utils.mapLoadingProps,
  getComponent: _utils.mapTextComponent
})((0, _utils.acceptEnum)(_antd.InputNumber)));