"use strict";

exports.__esModule = true;
exports.FormButtonGroup = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _grid = require("./grid");

var _form = require("../form");

var _reactStikky = _interopRequireDefault(require("react-stikky"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _class, _temp2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  ", "\n  &.is-inline {\n    display: inline-block;\n    flex-grow: 3;\n  }\n  .button-group {\n    .inline {\n      display: inline-block;\n      .inline-view {\n        & > * {\n          margin-right: 10px;\n          margin-left: 0px;\n          display: inline-block;\n        }\n        & > *:last-child {\n          margin-right: 0 !important;\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var getAlign = function getAlign(align) {
  if (align === 'start' || align === 'end') return align;
  if (align === 'left' || align === 'top') return 'start';
  if (align === 'right' || align === 'bottom') return 'end';
  return align;
};

var isElementInViewport = function isElementInViewport(rect, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? 0 : _ref$offset,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 0 : _ref$threshold;

  var top = rect.top,
      right = rect.right,
      bottom = rect.bottom,
      left = rect.left,
      width = rect.width,
      height = rect.height;
  var intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  };
  var elementThreshold = {
    x: threshold * width,
    y: threshold * height
  };
  return intersection.t >= (offset.top || offset + elementThreshold.y) && intersection.r >= (offset.right || offset + elementThreshold.x) && intersection.b >= (offset.bottom || offset + elementThreshold.y) && intersection.l >= (offset.left || offset + elementThreshold.x);
};

var FormButtonGroup = (0, _styledComponents.default)((_temp2 = _class =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FormButtonGroup, _Component);

  function FormButtonGroup() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FormButtonGroup.prototype;

  _proto.renderChildren = function renderChildren() {
    var _this$props = this.props,
        children = _this$props.children,
        itemStyle = _this$props.itemStyle,
        offset = _this$props.offset,
        span = _this$props.span;
    return _react.default.createElement("div", {
      className: "button-group"
    }, _react.default.createElement(_grid.Row, null, _react.default.createElement(_grid.Col, {
      span: span
    }, _react.default.createElement(_grid.Col, {
      offset: offset,
      className: "inline"
    }, _react.default.createElement("div", {
      className: "inline-view",
      style: itemStyle
    }, children)))));
  };

  _proto.getStickyBoundaryHandler = function getStickyBoundaryHandler(ref) {
    var _this = this;

    return function () {
      _this.formNode = _this.formNode || _reactDom.default.findDOMNode(ref.current);

      if (_this.formNode) {
        return isElementInViewport(_this.formNode.getBoundingClientRect());
      }

      return true;
    };
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        sticky = _this$props2.sticky,
        style = _this$props2.style,
        className = _this$props2.className;

    var content = _react.default.createElement(_form.FormConsumer, null, function (_temp3) {
      var _ref2 = _temp3 === void 0 ? {} : _temp3,
          inline = _ref2.inline;

      return _react.default.createElement("div", {
        className: (0, _classnames.default)(className, {
          'is-inline': !!inline
        }),
        style: style
      }, _this2.renderChildren());
    });

    if (sticky) {
      return _react.default.createElement(_form.FormConsumer, null, function (_temp4) {
        var _ref3 = _temp4 === void 0 ? {} : _temp4,
            inline = _ref3.inline,
            FormRef = _ref3.FormRef;

        if (!FormRef) return;
        return _react.default.createElement(_reactStikky.default, {
          edge: "bottom",
          triggerDistance: _this2.props.triggerDistance,
          offsetDistance: _this2.props.offsetDistance,
          zIndex: _this2.props.zIndex,
          getStickyBoundary: _this2.getStickyBoundaryHandler(FormRef),
          style: {
            borderTop: '1px solid #eee',
            background: style && style.background || '#fff',
            padding: style && style.padding || '20px 0'
          }
        }, _react.default.createElement("div", {
          className: className,
          style: style
        }, content));
      });
    }

    return content;
  };

  return FormButtonGroup;
}(_react.Component), _defineProperty(_class, "defaultProps", {
  span: 24
}), _temp2))(_templateObject(), function (props) {
  return props.align ? "display:flex;justify-content: " + getAlign(props.align) : '';
});
exports.FormButtonGroup = FormButtonGroup;