"use strict";

var _react = require("@uform/react");

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

(0, _react.registerFormField)('time', (0, _react.connect)({
  getValueFromEvent: function getValueFromEvent(_, value) {
    return value;
  },
  getProps: function getProps(props) {
    var value = props.value,
        _props$disabled = props.disabled,
        disabled = _props$disabled === void 0 ? false : _props$disabled,
        others = _objectWithoutPropertiesLoose(props, ["value", "disabled"]);

    try {
      if (!disabled && value) {
        props.value = (0, _moment.default)(value, 'HH:mm:ss');
      }
    } catch (e) {
      throw new Error(e);
    }

    (0, _utils.mapLoadingProps)(props, others);
  },
  getComponent: _utils.mapTextComponent
})(_antd.TimePicker));