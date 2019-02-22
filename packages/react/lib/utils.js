"use strict";

exports.__esModule = true;
var _exportNames = {
  lowercase: true,
  isNum: true,
  compose: true,
  createHOC: true,
  filterSchema: true,
  filterSchemaPropertiesAndReactChildren: true
};
exports.filterSchemaPropertiesAndReactChildren = exports.filterSchema = exports.createHOC = exports.compose = exports.isNum = exports.lowercase = void 0;

var _utils = require("@uform/utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _utils[key];
});

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var lowercase = function lowercase(str) {
  return String(str || '').toLowerCase();
};

exports.lowercase = lowercase;

var isNum = function isNum(val) {
  return typeof val === 'number';
};

exports.isNum = isNum;

var compose = function compose(payload, args, revert) {
  return (0, _utils.reduce)(args, function (buf, fn) {
    return (0, _utils.isFn)(fn) ? fn(buf) : buf;
  }, payload, revert);
};

exports.compose = compose;

var createHOC = function createHOC(wrapper) {
  return function (options) {
    return function (Target) {
      return wrapper(_extends({}, options), Target);
    };
  };
};

exports.createHOC = createHOC;

var filterSchema = function filterSchema(_, key) {
  return key !== 'properties' && key !== 'items';
};

exports.filterSchema = filterSchema;

var filterSchemaPropertiesAndReactChildren = function filterSchemaPropertiesAndReactChildren(_, key) {
  return key !== 'properties' && key !== 'items' && key !== 'children';
};

exports.filterSchemaPropertiesAndReactChildren = filterSchemaPropertiesAndReactChildren;