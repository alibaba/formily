"use strict";

var _react = require("@uform/react");

var _utils = require("../utils");

var _antd = require("antd");

(0, _react.registerFormField)('boolean', (0, _react.connect)({
  valueName: 'checked',
  getProps: _utils.mapLoadingProps
})((0, _utils.acceptEnum)(_antd.Switch)));