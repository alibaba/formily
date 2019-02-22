"use strict";

exports.__esModule = true;
exports.Reset = exports.Submit = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@uform/react");

var _next = require("@alifd/next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Submit = function Submit(_ref) {
  var showLoading = _ref.showLoading,
      props = _objectWithoutPropertiesLoose(_ref, ["showLoading"]);

  return _react.default.createElement(_react2.FormConsumer, null, function (_ref2) {
    var status = _ref2.status,
        schema = _ref2.schema;
    return _react.default.createElement(_next.Button, _extends({
      type: "primary",
      htmlType: "submit"
    }, props, {
      loading: props.showLoading ? status === 'submitting' : undefined
    }), props.children || '提交');
  });
};

exports.Submit = Submit;
Submit.defaultProps = {
  showLoading: true
};

var Reset = function Reset(props) {
  return _react.default.createElement(_react2.FormConsumer, null, function (_ref3) {
    var status = _ref3.status,
        reset = _ref3.reset;
    return _react.default.createElement(_next.Button, _extends({}, props, {
      onClick: reset
    }), props.children || '重置');
  });
};

exports.Reset = Reset;