"use strict";

var _react = require("@uform/react");

var _next = require("@alifd/next");

var _utils = require("../utils");

(0, _react.registerFormField)('range', (0, _react.connect)({
  defaultProps: {
    style: {
      width: 320
    }
  },
  getProps: _utils.mapStyledProps
})(_next.Range));