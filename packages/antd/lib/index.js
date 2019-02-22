"use strict";

exports.__esModule = true;
var _exportNames = {};
exports.default = void 0;

require("./form");

require("./fields/string");

require("./fields/number");

require("./fields/boolean");

require("./fields/date");

require("./fields/time");

require("./fields/range");

require("./fields/upload");

require("./fields/checkbox");

require("./fields/radio");

require("./fields/rating");

require("./fields/transfer");

require("./fields/array");

require("./fields/table");

require("./fields/password");

var _react = require("@uform/react");

Object.keys(_react).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _react[key];
});

var _formButtonGroup = require("./components/formButtonGroup");

Object.keys(_formButtonGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _formButtonGroup[key];
});

var _button = require("./components/button");

Object.keys(_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _button[key];
});

var _layout = require("./components/layout");

Object.keys(_layout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _layout[key];
});
var _default = _react.SchemaForm;
exports.default = _default;