"use strict";

exports.__esModule = true;
exports.Col = exports.Row = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("@uform/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Row =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Row, _Component);

  function Row() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Row.prototype;

  _proto.render = function render() {
    var _extends2, _extends3;

    /* eslint-disable no-unused-vars */
    var _this$props = this.props,
        prefix = _this$props.prefix,
        pure = _this$props.pure,
        wrap = _this$props.wrap,
        fixed = _this$props.fixed,
        gutter = _this$props.gutter,
        fixedWidth = _this$props.fixedWidth,
        align = _this$props.align,
        justify = _this$props.justify,
        hidden = _this$props.hidden,
        className = _this$props.className,
        Tag = _this$props.component,
        children = _this$props.children,
        others = _objectWithoutPropertiesLoose(_this$props, ["prefix", "pure", "wrap", "fixed", "gutter", "fixedWidth", "align", "justify", "hidden", "className", "component", "children"]);
    /* eslint-enable no-unused-vars */


    var hiddenClassObj;

    if (hidden === true) {
      var _hiddenClassObj;

      hiddenClassObj = (_hiddenClassObj = {}, _hiddenClassObj[prefix + "row-hidden"] = true, _hiddenClassObj);
    } else if (typeof hidden === 'string') {
      var _hiddenClassObj2;

      hiddenClassObj = (_hiddenClassObj2 = {}, _hiddenClassObj2[prefix + "row-" + hidden + "-hidden"] = !!hidden, _hiddenClassObj2);
    } else if (Array.isArray(hidden)) {
      hiddenClassObj = hidden.reduce(function (ret, point) {
        ret[prefix + "row-" + point + "-hidden"] = !!point;
        return ret;
      }, {});
    }

    var newClassName = (0, _classnames.default)(_extends((_extends2 = {}, _extends2[prefix + "row"] = true, _extends2[prefix + "row-wrap"] = wrap, _extends2[prefix + "row-fixed"] = fixed, _extends2[prefix + "row-fixed-" + fixedWidth] = !!fixedWidth, _extends2[prefix + "row-justify-" + justify] = !!justify, _extends2[prefix + "row-align-" + align] = !!align, _extends2), hiddenClassObj, (_extends3 = {}, _extends3[className] = !!className, _extends3)));
    var newChildren = (0, _utils.toArr)(children);
    var gutterNumber = parseInt(gutter, 10);

    if (gutterNumber !== 0) {
      var halfGutterString = gutterNumber / 2 + "px";
      others.style = _extends({
        marginLeft: "-" + halfGutterString,
        marginRight: "-" + halfGutterString
      }, others.style || {});
      newChildren = _react.Children.map(children, function (child, index) {
        if (child && child.type && typeof child.type === 'function' && child.type.isNextCol) {
          var newChild = (0, _react.cloneElement)(child, {
            style: _extends({
              paddingLeft: halfGutterString,
              paddingRight: halfGutterString
            }, child.style || {})
          });
          return newChild;
        }

        return child;
      });
    }

    return _react.default.createElement(Tag, _extends({
      role: "row",
      className: newClassName
    }, others), newChildren);
  };

  return Row;
}(_react.Component);

exports.Row = Row;

_defineProperty(Row, "defaultProps", {
  prefix: 'ant-',
  pure: false,
  fixed: false,
  gutter: 0,
  wrap: false,
  component: 'div'
});

var breakPoints = ['xxs', 'xs', 's', 'm', 'l', 'xl'];

var Col =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(Col, _Component2);

  function Col() {
    return _Component2.apply(this, arguments) || this;
  }

  var _proto2 = Col.prototype;

  _proto2.render = function render() {
    var _this = this,
        _extends4,
        _extends5;

    /* eslint-disable no-unused-vars */
    var _this$props2 = this.props,
        prefix = _this$props2.prefix,
        pure = _this$props2.pure,
        span = _this$props2.span,
        offset = _this$props2.offset,
        fixedSpan = _this$props2.fixedSpan,
        fixedOffset = _this$props2.fixedOffset,
        hidden = _this$props2.hidden,
        align = _this$props2.align,
        xxs = _this$props2.xxs,
        xs = _this$props2.xs,
        s = _this$props2.s,
        m = _this$props2.m,
        l = _this$props2.l,
        xl = _this$props2.xl,
        Tag = _this$props2.component,
        className = _this$props2.className,
        children = _this$props2.children,
        others = _objectWithoutPropertiesLoose(_this$props2, ["prefix", "pure", "span", "offset", "fixedSpan", "fixedOffset", "hidden", "align", "xxs", "xs", "s", "m", "l", "xl", "component", "className", "children"]);
    /* eslint-enable no-unused-vars */


    var pointClassObj = breakPoints.reduce(function (ret, point) {
      var pointProps = {};

      if (typeof _this.props[point] === 'object') {
        pointProps = _this.props[point];
      } else {
        pointProps.span = _this.props[point];
      }

      ret[prefix + "col-" + point + "-" + pointProps.span] = !!pointProps.span;
      ret[prefix + "col-" + point + "-offset-" + pointProps.offset] = !!pointProps.offset;
      return ret;
    }, {});
    var hiddenClassObj;

    if (hidden === true) {
      var _hiddenClassObj3;

      hiddenClassObj = (_hiddenClassObj3 = {}, _hiddenClassObj3[prefix + "col-hidden"] = true, _hiddenClassObj3);
    } else if (typeof hidden === 'string') {
      var _hiddenClassObj4;

      hiddenClassObj = (_hiddenClassObj4 = {}, _hiddenClassObj4[prefix + "col-" + hidden + "-hidden"] = !!hidden, _hiddenClassObj4);
    } else if (Array.isArray(hidden)) {
      hiddenClassObj = hidden.reduce(function (ret, point) {
        ret[prefix + "col-" + point + "-hidden"] = !!point;
        return ret;
      }, {});
    }

    var classes = (0, _classnames.default)(_extends((_extends4 = {}, _extends4[prefix + "col"] = true, _extends4[prefix + "col-" + span] = !!span, _extends4[prefix + "col-fixed-" + fixedSpan] = !!fixedSpan, _extends4[prefix + "col-offset-" + offset] = !!offset, _extends4[prefix + "col-offset-fixed-" + fixedOffset] = !!fixedOffset, _extends4[prefix + "col-" + align] = !!align, _extends4), pointClassObj, hiddenClassObj, (_extends5 = {}, _extends5[className] = className, _extends5)));
    return _react.default.createElement(Tag, _extends({
      role: "gridcell",
      className: classes
    }, others), children);
  };

  return Col;
}(_react.Component);

exports.Col = Col;

_defineProperty(Col, "isNextCol", true);

_defineProperty(Col, "defaultProps", {
  prefix: 'ant-',
  pure: false,
  component: 'div'
});