"use strict";

exports.__esModule = true;
exports.Reset = exports.Submit = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@uform/react");

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Submit = function Submit(props) {
  return _react.default.createElement(_react2.FormConsumer, null, function (_ref) {
    var status = _ref.status,
        schema = _ref.schema;
    return _react.default.createElement(_antd.Button, _extends({
      type: "primary",
      htmlType: "submit"
    }, props, {
      loading: status === 'submitting'
    }), props.children || '提交');
  });
};

exports.Submit = Submit;

var Reset = function Reset(props) {
  return _react.default.createElement(_react2.FormConsumer, null, function (_ref2) {
    var status = _ref2.status,
        reset = _ref2.reset;
    return _react.default.createElement(_antd.Button, _extends({}, props, {
      onClick: reset
    }), props.children || '重置');
  });
};

exports.Reset = Reset;