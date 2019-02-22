"use strict";

exports.__esModule = true;
exports.FormBlock = exports.FormCard = exports.FormItemGrid = exports.FormLayout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@uform/react");

var _utils = require("@uform/utils");

var _grid = require("./grid");

var _antd = require("antd");

var _form = require("../form");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _classnames = _interopRequireDefault(require("classnames"));

var _class2, _temp, _class3, _temp2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n    margin-bottom: 0px;\n    .ant-card-body {\n      padding-top: 20px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      border: none;\n      padding: 0 15px;\n      padding-bottom: 15px;\n      display: block;\n      box-shadow: none;\n    }\n    .ant-card-head {\n      padding: 0 !important;\n      min-height: 24px;\n      font-weight: normal;\n    }\n    .ant-card-head-title {\n      padding: 0;\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n    margin-bottom: 30px;\n    .ant-card-body {\n      padding-top: 30px;\n      padding-bottom: 0 !important;\n    }\n    &.ant-card {\n      display: block;\n      margin-bottom: 30px;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var normalizeCol = function normalizeCol(col, _default) {
  if (_default === void 0) {
    _default = 0;
  }

  if (!col) return _default;
  return typeof col === 'object' ? col : {
    span: col
  };
};

var FormLayout = (0, _react2.createVirtualBox)('layout', function (_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return _react.default.createElement(_form.FormConsumer, null, function (value) {
    var newValue = _extends({}, value, props);

    var child = newValue.inline || newValue.className || newValue.style ? _react.default.createElement("div", {
      className: (0, _classnames.default)(newValue.className, {
        'ant-form ant-inline': !!newValue.inline
      }),
      style: newValue.style
    }, children) : children;
    return _react.default.createElement(_form.FormProvider, {
      value: newValue
    }, child);
  });
});
exports.FormLayout = FormLayout;
var FormItemGrid = (0, _react2.createVirtualBox)('grid',
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(_class, _Component);

  function _class() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = _class.prototype;

  _proto.renderFormItem = function renderFormItem(children) {
    var _this$props = this.props,
        title = _this$props.title,
        description = _this$props.description,
        name = _this$props.name,
        help = _this$props.help,
        extra = _this$props.extra,
        others = _objectWithoutPropertiesLoose(_this$props, ["title", "description", "name", "help", "extra"]);

    return _react.default.createElement(_form.FormConsumer, {}, function (_ref2) {
      var labelAlign = _ref2.labelAlign,
          labelTextAlign = _ref2.labelTextAlign,
          labelCol = _ref2.labelCol,
          wrapperCol = _ref2.wrapperCol,
          size = _ref2.size,
          autoAddColon = _ref2.autoAddColon;
      return _react.default.createElement(_form.FormItem, _extends({
        labelAlign: labelAlign,
        labelTextAlign: labelTextAlign,
        labelCol: labelCol,
        wrapperCol: wrapperCol,
        autoAddColon: autoAddColon,
        size: size
      }, others, {
        label: title,
        noMinHeight: true,
        id: name,
        extra: description,
        help: help
      }), children);
    });
  };

  _proto.renderGrid = function renderGrid() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        cols = _this$props2.cols,
        title = _this$props2.title,
        description = _this$props2.description,
        help = _this$props2.help,
        extra = _this$props2.extra,
        props = _objectWithoutPropertiesLoose(_this$props2, ["children", "cols", "title", "description", "help", "extra"]);

    children = (0, _utils.toArr)(children);
    cols = (0, _utils.toArr)(cols).map(function (col) {
      return normalizeCol(col);
    });
    var childNum = children.length;

    if (cols.length < childNum) {
      var offset = childNum - cols.length;
      var lastSpan = 24 - cols.reduce(function (buf, col) {
        return buf + Number(col.span ? col.span : 0) + Number(col.offset ? col.offset : 0);
      }, 0);

      for (var i = 0; i < offset; i++) {
        cols.push(parseInt(lastSpan / offset));
      }
    }

    cols = (0, _utils.toArr)(cols).map(function (col) {
      return normalizeCol(col);
    });
    return _react.default.createElement(_grid.Row, props, children.reduce(function (buf, child, key) {
      return child ? buf.concat(_react.default.createElement(_grid.Col, _extends({
        key: key
      }, cols[key]), child)) : buf;
    }, []));
  };

  _proto.render = function render() {
    var title = this.props.title;

    if (title) {
      return this.renderFormItem(this.renderGrid());
    } else {
      return this.renderGrid();
    }
  };

  return _class;
}(_react.Component));
exports.FormItemGrid = FormItemGrid;
var FormCard = (0, _react2.createVirtualBox)('card', (0, _styledComponents.default)((_temp = _class2 =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(_class2, _Component2);

  function _class2() {
    return _Component2.apply(this, arguments) || this;
  }

  var _proto2 = _class2.prototype;

  _proto2.render = function render() {
    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        props = _objectWithoutPropertiesLoose(_this$props3, ["children", "className"]);

    return _react.default.createElement(_antd.Card, _extends({
      className: className
    }, props), children);
  };

  return _class2;
}(_react.Component), _defineProperty(_class2, "defaultProps", {// bodyHeight: 'auto'
}), _temp))(_templateObject()));
exports.FormCard = FormCard;
var FormBlock = (0, _react2.createVirtualBox)('block', (0, _styledComponents.default)((_temp2 = _class3 =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(_class3, _Component3);

  function _class3() {
    return _Component3.apply(this, arguments) || this;
  }

  var _proto3 = _class3.prototype;

  _proto3.render = function render() {
    var _this$props4 = this.props,
        children = _this$props4.children,
        className = _this$props4.className,
        props = _objectWithoutPropertiesLoose(_this$props4, ["children", "className"]);

    return _react.default.createElement(_antd.Card, _extends({
      className: className
    }, props), children);
  };

  return _class3;
}(_react.Component), _defineProperty(_class3, "defaultProps", {// bodyHeight: 'auto'
}), _temp2))(_templateObject2()));
exports.FormBlock = FormBlock;