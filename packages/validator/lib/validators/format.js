"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _message = require("../message");

var _pattern = require("./pattern");

var RegExpPatterns = _interopRequireWildcard(require("./regexp"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var PatternKeys = Object.keys(RegExpPatterns);

var batchValidate = function batchValidate(value, rule, values, name) {
  for (var i = 0; i < PatternKeys.length; i++) {
    if (PatternKeys[i] === rule.format) {
      return (0, _pattern.patternValidate)(RegExpPatterns[PatternKeys[i]], value, (0, _utils.format)(rule.message || (0, _message.getMessage)(rule.format), name, value));
    }
  }
};

var _default = function _default(value, rule, values, name) {
  return batchValidate(value, rule, values, name);
};

exports.default = _default;