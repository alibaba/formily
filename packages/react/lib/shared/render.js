"use strict";

var _react = _interopRequireDefault(require("react"));

var _field = require("../state/field");

var _core = require("./core");

var _utils = require("../utils");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _core.registerFieldRenderer)((0, _field.StateField)()((_temp = _class =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(_class, _React$Component);

  function _class() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = _class.prototype;

  _proto.render = function render() {
    if ((0, _utils.isFn)(this.props.schema['x-render'])) {
      return this.props.schema['x-render'](this.props);
    }

    return _react.default.createElement(_react.default.Fragment, null);
  };

  return _class;
}(_react.default.Component), _defineProperty(_class, "displayName", 'FieldXRenderer'), _temp)));