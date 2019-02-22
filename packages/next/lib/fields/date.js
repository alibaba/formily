"use strict";

var _react = require("@uform/react");

var _next = require("@alifd/next");

var _utils = require("../utils");

var RangePicker = _next.DatePicker.RangePicker,
    MonthPicker = _next.DatePicker.MonthPicker,
    YearPicker = _next.DatePicker.YearPicker;

var transformMoment = function transformMoment(value, format) {
  if (format === void 0) {
    format = 'YYYY-MM-DD HH:mm:ss';
  }

  return value && value.format ? value.format(format) : value;
};

(0, _react.registerFormField)('date', (0, _react.connect)({
  getValueFromEvent: function getValueFromEvent(value) {
    var props = this.props || {};
    return transformMoment(value, props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
  },
  getProps: _utils.mapStyledProps,
  getComponent: _utils.mapTextComponent
})(_next.DatePicker));
(0, _react.registerFormField)('daterange', (0, _react.connect)({
  getValueFromEvent: function getValueFromEvent(_ref) {
    var startDate = _ref[0],
        endDate = _ref[1];
    var props = this.props || {};
    var format = props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    return [transformMoment(startDate, format), transformMoment(endDate, format)];
  },
  getProps: _utils.mapStyledProps,
  getComponent: _utils.mapTextComponent
})(RangePicker));
(0, _react.registerFormField)('month', (0, _react.connect)({
  getValueFromEvent: function getValueFromEvent(value) {
    return transformMoment(value);
  },
  getProps: _utils.mapStyledProps,
  getComponent: _utils.mapTextComponent
})(MonthPicker));
(0, _react.registerFormField)('year', (0, _react.connect)({
  getValueFromEvent: function getValueFromEvent(value) {
    return transformMoment(value);
  },
  getProps: _utils.mapStyledProps,
  getComponent: _utils.mapTextComponent
})(YearPicker));