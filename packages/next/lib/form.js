"use strict";

exports.__esModule = true;
exports.FormItem = exports.FormConsumer = exports.FormProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@uform/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _next = require("@alifd/next");

var _grid = require("@alifd/next/lib/grid");

var _locale = _interopRequireDefault(require("./locale"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("./utils");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n    &.next-inline {\n      display: flex;\n      .rs-uform-content {\n        margin-right: 15px;\n      }\n    }\n    .next-radio-group,\n    .next-checkbox-group {\n      line-height: 28px;\n      & > label {\n        margin-right: 8px;\n      }\n    }\n    .next-small {\n      .next-radio-group,\n      .next-checkbox-group {\n        line-height: 20px;\n      }\n    }\n    .next-small {\n      .next-radio-group,\n      .next-checkbox-group {\n        line-height: 40px;\n      }\n    }\n    .next-card-head {\n      background: none;\n    }\n    .next-rating-medium {\n      min-height: 28px;\n      line-height: 28px;\n    }\n    .next-rating-small {\n      min-height: 20px;\n      line-height: 20px;\n    }\n    .next-rating-large {\n      min-height: 40px;\n      line-height: 40px;\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  margin-bottom: 6px;\n  &.field-table {\n    .next-form-item-control {\n      overflow: auto;\n    }\n  }\n  .next-form-item-msg {\n    &.next-form-item-space {\n      min-height: 20px;\n      .next-form-item-help,\n      .next-form-item-extra {\n        margin-top: 0;\n      }\n    }\n  }\n  .next-form-item-extra {\n    color: #888;\n    font-size: 12px;\n    line-height: 1.7;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

/**
 * 轻量级Next Form，不包含任何数据管理能力
 *
 */
var _React$createContext = _react.default.createContext(),
    FormProvider = _React$createContext.Provider,
    FormConsumer = _React$createContext.Consumer;

exports.FormConsumer = FormConsumer;
exports.FormProvider = FormProvider;

var normalizeCol = function normalizeCol(col) {
  return typeof col === 'object' ? col : {
    span: col
  };
};

var getParentNode = function getParentNode(node, selector) {
  if (!node || node && !node.matches) return;
  if (node.matches(selector)) return node;else {
    return getParentNode(node.parentNode || node.parentElement, selector);
  }
};

var FormItem = (0, _styledComponents.default)((_temp = _class =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormItem, _React$Component);

  function FormItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormItem.prototype;

  _proto.getItemLabel = function getItemLabel() {
    var _classNames;

    var _this$props = this.props,
        id = _this$props.id,
        required = _this$props.required,
        label = _this$props.label,
        labelCol = _this$props.labelCol,
        wrapperCol = _this$props.wrapperCol,
        prefix = _this$props.prefix,
        extra = _this$props.extra,
        labelAlign = _this$props.labelAlign,
        labelTextAlign = _this$props.labelTextAlign,
        autoAddColon = _this$props.autoAddColon,
        isTableColItem = _this$props.isTableColItem;

    if (!label || isTableColItem) {
      return null;
    }

    var ele = _react.default.createElement("label", {
      htmlFor: id,
      required: required,
      key: "label"
    }, label, label === ' ' ? '' : autoAddColon ? '：' : '');

    var cls = (0, _classnames.default)((_classNames = {}, _classNames[prefix + "form-item-label"] = true, _classNames[prefix + "left"] = labelTextAlign === 'left', _classNames));

    if ((wrapperCol || labelCol) && labelAlign !== 'top') {
      return _react.default.createElement(_grid.Col, _extends({}, normalizeCol(labelCol), {
        className: cls
      }), ele, (extra && extra.length > 20 || _react.default.isValidElement(extra)) && this.renderHelper());
    }

    return _react.default.createElement("div", {
      className: cls
    }, ele);
  };

  _proto.getItemWrapper = function getItemWrapper() {
    var _this$props2 = this.props,
        labelCol = _this$props2.labelCol,
        wrapperCol = _this$props2.wrapperCol,
        children = _this$props2.children,
        extra = _this$props2.extra,
        label = _this$props2.label,
        labelAlign = _this$props2.labelAlign,
        help = _this$props2.help,
        size = _this$props2.size,
        prefix = _this$props2.prefix,
        noMinHeight = _this$props2.noMinHeight,
        isTableColItem = _this$props2.isTableColItem;

    var message = _react.default.createElement("div", {
      className: prefix + "form-item-msg " + (!noMinHeight ? prefix + "form-item-space" : '')
    }, help && _react.default.createElement("div", {
      className: prefix + "form-item-help"
    }, help), !help && extra && extra.length <= 20 && _react.default.createElement("div", {
      className: prefix + "form-item-extra"
    }, extra));

    if ((wrapperCol || labelCol) && labelAlign !== 'top' && !isTableColItem && label) {
      return _react.default.createElement(_grid.Col, _extends({}, normalizeCol(wrapperCol), {
        className: prefix + "form-item-control",
        key: "item"
      }), _react.default.cloneElement(children, {
        size: size
      }), message);
    }

    return _react.default.createElement("div", {
      className: prefix + "form-item-control"
    }, _react.default.cloneElement(children, {
      size: size
    }), message);
  };

  _proto.renderHelper = function renderHelper() {
    return _react.default.createElement(_next.Balloon, {
      closable: false,
      align: "t",
      trigger: _react.default.createElement(_next.Icon, {
        type: "help",
        size: "small"
      })
    }, this.props.extra);
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props3 = this.props,
        className = _this$props3.className,
        labelAlign = _this$props3.labelAlign,
        labelTextAlign = _this$props3.labelTextAlign,
        style = _this$props3.style,
        prefix = _this$props3.prefix,
        wrapperCol = _this$props3.wrapperCol,
        labelCol = _this$props3.labelCol,
        size = _this$props3.size,
        help = _this$props3.help,
        extra = _this$props3.extra,
        noMinHeight = _this$props3.noMinHeight,
        isTableColItem = _this$props3.isTableColItem,
        validateState = _this$props3.validateState,
        autoAddColon = _this$props3.autoAddColon,
        required = _this$props3.required,
        type = _this$props3.type,
        schema = _this$props3.schema,
        others = _objectWithoutPropertiesLoose(_this$props3, ["className", "labelAlign", "labelTextAlign", "style", "prefix", "wrapperCol", "labelCol", "size", "help", "extra", "noMinHeight", "isTableColItem", "validateState", "autoAddColon", "required", "type", "schema"]);

    var itemClassName = (0, _classnames.default)((_classNames2 = {}, _classNames2[prefix + "form-item"] = true, _classNames2["" + prefix + labelAlign] = labelAlign, _classNames2["has-" + validateState] = !!validateState, _classNames2["" + prefix + size] = !!size, _classNames2["" + className] = !!className, _classNames2["field-" + type] = !!type, _classNames2)); // 垂直模式并且左对齐才用到

    var Tag = (wrapperCol || labelCol) && labelAlign !== 'top' ? _grid.Row : 'div';
    var label = labelAlign === 'inset' ? null : this.getItemLabel();
    return _react.default.createElement(Tag, _extends({}, others, {
      gutter: 0,
      className: itemClassName,
      style: style
    }), label, this.getItemWrapper());
  };

  return FormItem;
}(_react.default.Component), _defineProperty(_class, "defaultProps", {
  prefix: 'next-'
}), _temp))(_templateObject());
exports.FormItem = FormItem;

var toArr = function toArr(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
};

var hasRequired = function hasRequired(schema) {
  if (schema.required) return true;
  if (schema['x-rules'] && schema['x-rules'].required) return true;
  return toArr(schema['x-rules']).some(function (v) {
    return v && v.required;
  });
};

(0, _react2.registerFormWrapper)(function (OriginForm) {
  var _class2, _temp2;

  OriginForm = (0, _styledComponents.default)(OriginForm)(_templateObject2());
  return _next.ConfigProvider.config((_temp2 = _class2 =
  /*#__PURE__*/
  function (_React$Component2) {
    _inheritsLoose(Form, _React$Component2);

    function Form() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_this), "FormRef", _react.default.createRef());

      return _this;
    }

    var _proto2 = Form.prototype;

    _proto2.validateFailedHandler = function validateFailedHandler(onValidateFailed) {
      var _this2 = this;

      return function () {
        if ((0, _utils.isFn)(onValidateFailed)) {
          onValidateFailed.apply(void 0, arguments);
        }

        var container = _this2.FormRef.current;

        if (container) {
          var errors = container.querySelectorAll('.next-form-item-help');

          if (errors && errors.length) {
            var node = getParentNode(errors[0], '.next-form-item');

            if (node) {
              (0, _utils.moveTo)(node);
            }
          }
        }
      };
    };

    _proto2.render = function render() {
      var _classNames3;

      var _this$props4 = this.props,
          className = _this$props4.className,
          inline = _this$props4.inline,
          size = _this$props4.size,
          labelAlign = _this$props4.labelAlign,
          labelTextAlign = _this$props4.labelTextAlign,
          autoAddColon = _this$props4.autoAddColon,
          children = _this$props4.children,
          component = _this$props4.component,
          labelCol = _this$props4.labelCol,
          wrapperCol = _this$props4.wrapperCol,
          style = _this$props4.style,
          prefix = _this$props4.prefix,
          others = _objectWithoutPropertiesLoose(_this$props4, ["className", "inline", "size", "labelAlign", "labelTextAlign", "autoAddColon", "children", "component", "labelCol", "wrapperCol", "style", "prefix"]);

      var formClassName = (0, _classnames.default)((_classNames3 = {}, _classNames3[prefix + "form"] = true, _classNames3[prefix + "inline"] = inline, _classNames3["" + prefix + size] = size, _classNames3[className] = !!className, _classNames3));
      return _react.default.createElement(FormProvider, {
        value: {
          labelAlign: labelAlign,
          labelTextAlign: labelTextAlign,
          labelCol: labelCol,
          wrapperCol: wrapperCol,
          inline: inline,
          size: size,
          autoAddColon: autoAddColon,
          FormRef: this.FormRef
        }
      }, _react.default.createElement(OriginForm, _extends({}, others, {
        formRef: this.FormRef,
        onValidateFailed: this.validateFailedHandler(others.onValidateFailed),
        className: formClassName,
        style: style
      }), children));
    };

    return Form;
  }(_react.default.Component), _defineProperty(_class2, "defaultProps", {
    component: 'form',
    prefix: 'next-',
    size: 'medium',
    labelAlign: 'left',
    locale: _locale.default,
    autoAddColon: true
  }), _defineProperty(_class2, "displayName", 'SchemaForm'), _temp2));
});

var isTableColItem = function isTableColItem(path, getSchema) {
  var schema = getSchema(path);
  return schema && schema.type === 'array' && schema['x-component'] === 'table';
};

(0, _react2.registerFieldMiddleware)(function (Field) {
  return function (props) {
    var name = props.name,
        editable = props.editable,
        errors = props.errors,
        path = props.path,
        schema = props.schema,
        getSchema = props.getSchema;
    if (path.length === 0) return _react.default.createElement(Field, props); // 根节点是不需要包FormItem的

    return _react.default.createElement(FormConsumer, {}, function (_ref) {
      var labelAlign = _ref.labelAlign,
          labelTextAlign = _ref.labelTextAlign,
          labelCol = _ref.labelCol,
          wrapperCol = _ref.wrapperCol,
          size = _ref.size,
          autoAddColon = _ref.autoAddColon;
      return _react.default.createElement(FormItem, _extends({
        labelAlign: labelAlign,
        labelTextAlign: labelTextAlign,
        labelCol: labelCol,
        wrapperCol: wrapperCol,
        autoAddColon: autoAddColon,
        size: size
      }, schema['x-item-props'], {
        label: schema.title || schema['x-props'] && schema['x-props'].title,
        noMinHeight: schema.type === 'object',
        isTableColItem: isTableColItem(path.slice(0, path.length - 2), getSchema),
        type: schema['x-component'] || schema['type'],
        id: name,
        validateState: toArr(errors).length ? 'error' : undefined,
        required: editable === false ? false : hasRequired(schema),
        extra: schema.description,
        help: toArr(errors).join(' , ') || schema['x-item-props'] && schema['x-item-props'].help
      }), _react.default.createElement(Field, props));
    });
  };
});