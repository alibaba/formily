"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@uform/react");

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AntRangePicker = _antd.DatePicker.RangePicker,
    AntMonthPicker = _antd.DatePicker.MonthPicker;

var AntYearPicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(AntYearPicker, _React$Component);

  function AntYearPicker() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = AntYearPicker.prototype;

  _proto.render = function render() {
    return _react.default.createElement(_antd.DatePicker, _extends({}, this.props, {
      mode: "year"
    }));
  };

  return AntYearPicker;
}(_react.default.Component);

var DatePicker = (0, _utils.StateLoading)(_antd.DatePicker);
var RangePicker = (0, _utils.StateLoading)(AntRangePicker);
var MonthPicker = (0, _utils.StateLoading)(AntMonthPicker);
var YearPicker = (0, _utils.StateLoading)(AntYearPicker);

var transformMoment = function transformMoment(value, format) {
  if (format === void 0) {
    format = 'YYYY-MM-DD HH:mm:ss';
  }

  return value && value.format ? value.format(format) : value;
};

(0, _react2.registerFormField)('date', (0, _react2.connect)({
  getValueFromEvent: function getValueFromEvent(_, value) {
    var props = this.props || {};
    return transformMoment(value, props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
  },
  getProps: function getProps(props) {
    var value = props.value,
        _props$showTime = props.showTime,
        showTime = _props$showTime === void 0 ? false : _props$showTime,
        _props$disabled = props.disabled,
        disabled = _props$disabled === void 0 ? false : _props$disabled,
        others = _objectWithoutPropertiesLoose(props, ["value", "showTime", "disabled"]);

    try {
      if (!disabled && value) {
        props.value = (0, _moment.default)(value, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
      }
    } catch (e) {
      throw new Error(e);
    }

    (0, _utils.mapLoadingProps)(props, others);
  },
  getComponent: _utils.mapTextComponent
})(DatePicker));
(0, _react2.registerFormField)('daterange', (0, _react2.connect)({
  getValueFromEvent: function getValueFromEvent(_, _ref) {
    var startDate = _ref[0],
        endDate = _ref[1];
    var props = this.props || {};
    var format = props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    return [transformMoment(startDate, format), transformMoment(endDate, format)];
  },
  getProps: function getProps(props) {
    var _props$value = props.value,
        value = _props$value === void 0 ? [] : _props$value,
        _props$showTime2 = props.showTime,
        showTime = _props$showTime2 === void 0 ? false : _props$showTime2,
        _props$disabled2 = props.disabled,
        disabled = _props$disabled2 === void 0 ? false : _props$disabled2,
        others = _objectWithoutPropertiesLoose(props, ["value", "showTime", "disabled"]);

    try {
      if (!disabled && value.length) {
        props.value = value.map(function (item) {
          return item && (0, _moment.default)(item, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD') || '';
        });
      }
    } catch (e) {
      throw new Error(e);
    }

    (0, _utils.mapLoadingProps)(props, others);
  },
  getComponent: _utils.mapTextComponent
})(RangePicker));
(0, _react2.registerFormField)('month', (0, _react2.connect)({
  getValueFromEvent: function getValueFromEvent(_, value) {
    return transformMoment(value);
  },
  getProps: function getProps(props) {
    var value = props.value,
        _props$showTime3 = props.showTime,
        showTime = _props$showTime3 === void 0 ? false : _props$showTime3,
        _props$disabled3 = props.disabled,
        disabled = _props$disabled3 === void 0 ? false : _props$disabled3,
        others = _objectWithoutPropertiesLoose(props, ["value", "showTime", "disabled"]);

    try {
      if (!disabled && value) {
        props.value = (0, _moment.default)(value, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM');
      }
    } catch (e) {
      throw new Error(e);
    }

    (0, _utils.mapLoadingProps)(props, others);
  },
  getComponent: _utils.mapTextComponent
})(MonthPicker));
(0, _react2.registerFormField)('year', (0, _react2.connect)({
  getValueFromEvent: function getValueFromEvent(_, value) {
    return transformMoment(value);
  },
  getProps: function getProps(props) {
    var value = props.value,
        _props$showTime4 = props.showTime,
        showTime = _props$showTime4 === void 0 ? false : _props$showTime4,
        _props$disabled4 = props.disabled,
        disabled = _props$disabled4 === void 0 ? false : _props$disabled4,
        others = _objectWithoutPropertiesLoose(props, ["value", "showTime", "disabled"]);

    try {
      if (!disabled && value) {
        props.value = (0, _moment.default)(value, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM');
      }
    } catch (e) {
      throw new Error(e);
    }

    (0, _utils.mapLoadingProps)(props, others);
  },
  getComponent: _utils.mapTextComponent
})(YearPicker));