"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@uform/react");

var _antd = require("antd");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

(0, _react2.registerFormField)('range', (0, _react2.connect)({
  defaultProps: {
    style: {
      width: 320
    }
  },
  getProps: _utils.mapLoadingProps
})(
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Component, _React$Component);

  function Component() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Component.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        onChange = _this$props.onChange,
        value = _this$props.value,
        min = _this$props.min,
        max = _this$props.max,
        marks = _this$props.marks;
    var newMarks = {};

    if (Array.isArray(marks)) {
      marks.forEach(function (mark) {
        newMarks[mark] = mark;
      });
    } else {
      newMarks = marks;
    }

    return _react.default.createElement(_antd.Slider, {
      onChange: onChange,
      value: value,
      min: min,
      max: max,
      marks: newMarks
    });
  };

  return Component;
}(_react.default.Component)));