"use strict";

var _react = require("@uform/react");

var _antd = require("antd");

var _utils = require("../utils");

(0, _react.registerFormField)('rating', (0, _react.connect)({
  getProps: _utils.mapLoadingProps
})(_antd.Rate));