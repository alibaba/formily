"use strict";

exports.__esModule = true;
exports.validate = void 0;

var _utils = require("../utils");

var _format = _interopRequireDefault(require("./format"));

var _required = _interopRequireDefault(require("./required"));

var _pattern = _interopRequireDefault(require("./pattern"));

var _custom = _interopRequireDefault(require("./custom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * rule : {
     format:"",
 *   required:true,
 *   message:"",
 *   pattern:"",
 *   validator(value,rule,callback,values){
 *   }
 * }
 *
**/
var batchInvoke = function batchInvoke() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.map(function (fn) {
      return Promise.resolve(fn.apply(void 0, args));
    });
  };
};

var batchValidate = function batchValidate(value, rule, values, name) {
  return Promise.all(batchInvoke(_format.default, _required.default, _pattern.default, _custom.default)(value, rule, values, name));
};

var validate = function validate(value, rule, values, name) {
  var newRule = (0, _utils.isObj)(rule) ? rule : (0, _utils.isStr)(rule) ? {
    format: rule
  } : (0, _utils.isFn)(rule) ? {
    validator: rule
  } : {};
  return batchValidate(value, newRule, values, name);
};

exports.validate = validate;