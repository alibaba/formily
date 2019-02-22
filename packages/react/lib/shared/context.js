"use strict";

exports.__esModule = true;
exports.BroadcastContext = exports.StateContext = exports.MarkupContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkupContext = _react.default.createContext();

exports.MarkupContext = MarkupContext;

var StateContext = _react.default.createContext();

exports.StateContext = StateContext;

var BroadcastContext = _react.default.createContext();

exports.BroadcastContext = BroadcastContext;