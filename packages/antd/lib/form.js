"use strict";

exports.__esModule = true;
exports.FormItem = exports.FormConsumer = exports.FormProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@uform/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _antd = require("antd");

var _grid = require("./components/grid");

var _locale = _interopRequireDefault(require("./locale"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("./utils");

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n    &.ant-inline,\n    .ant-inline {\n      display: flex;\n      .rs-uform-content {\n        margin-right: 15px;\n      }\n      .ant-form-item {\n        display: inline-block;\n        vertical-align: top;\n      }\n      .ant-form-item:not(:last-child) {\n        margin-right: 20px;\n      }\n      .ant-form-item.ant-left .ant-form-item-control {\n        display: inline-block;\n        display: table-cell\0;\n        vertical-align: top;\n        line-height: 0;\n      }\n    }\n    .ant-form-item-label {\n      line-height: 32px;\n      padding-right: 12px;\n      text-align: right;\n    }\n    .ant-small {\n      .ant-form-item-label {\n        line-height: 24px;\n      }\n      .ant-radio-group,\n      .ant-checkbox-group {\n        line-height: 24px;\n        min-height: 24px;\n      }\n    }\n    .ant-large {\n      .ant-form-item-label {\n        line-height: 40px;\n      }\n      .ant-radio-group,\n      .ant-checkbox-group {\n        line-height: 40px;\n        min-height: 40px;\n      }\n    }\n    .ant-form-item-label label[required]:before {\n      margin-right: 4px;\n      content: '*';\n      color: #ff3000;\n    }\n    .ant-form-item-help {\n      margin-top: 4px;\n      font-size: 12px;\n      line-height: 1.5;\n      color: #999;\n    }\n    .ant-form-item.has-error .ant-form-item-help {\n      color: #ff3000;\n    }\n    .ant-radio-group,\n    .ant-checkbox-group {\n      line-height: 32px;\n      & > label {\n        margin-right: 15px;\n      }\n    }\n    .ant-range {\n      margin-top: 10px;\n    }\n    .ant-number-picker-normal {\n      min-width: 62px;\n      width: 100px;\n      .ant-number-picker-input-wrap {\n        width: calc(100% - 22px);\n        .ant-number-picker-input {\n          width: 100%;\n          input {\n            text-align: left;\n            padding: 0 8px;\n          }\n        }\n      }\n    }\n    .ant-table {\n      table {\n        table-layout: auto;\n      }\n    }\n    .ant-rating-medium {\n      min-height: 30px;\n      line-height: 30px;\n    }\n    .ant-rating-small {\n      min-height: 24px;\n      line-height: 24px;\n    }\n    .ant-rating-large {\n      min-height: 40px;\n      line-height: 40px;\n    }\n  "], ["\n    &.ant-inline,\n    .ant-inline {\n      display: flex;\n      .rs-uform-content {\n        margin-right: 15px;\n      }\n      .ant-form-item {\n        display: inline-block;\n        vertical-align: top;\n      }\n      .ant-form-item:not(:last-child) {\n        margin-right: 20px;\n      }\n      .ant-form-item.ant-left .ant-form-item-control {\n        display: inline-block;\n        display: table-cell\\0;\n        vertical-align: top;\n        line-height: 0;\n      }\n    }\n    .ant-form-item-label {\n      line-height: 32px;\n      padding-right: 12px;\n      text-align: right;\n    }\n    .ant-small {\n      .ant-form-item-label {\n        line-height: 24px;\n      }\n      .ant-radio-group,\n      .ant-checkbox-group {\n        line-height: 24px;\n        min-height: 24px;\n      }\n    }\n    .ant-large {\n      .ant-form-item-label {\n        line-height: 40px;\n      }\n      .ant-radio-group,\n      .ant-checkbox-group {\n        line-height: 40px;\n        min-height: 40px;\n      }\n    }\n    .ant-form-item-label label[required]:before {\n      margin-right: 4px;\n      content: '*';\n      color: #ff3000;\n    }\n    .ant-form-item-help {\n      margin-top: 4px;\n      font-size: 12px;\n      line-height: 1.5;\n      color: #999;\n    }\n    .ant-form-item.has-error .ant-form-item-help {\n      color: #ff3000;\n    }\n    .ant-radio-group,\n    .ant-checkbox-group {\n      line-height: 32px;\n      & > label {\n        margin-right: 15px;\n      }\n    }\n    .ant-range {\n      margin-top: 10px;\n    }\n    .ant-number-picker-normal {\n      min-width: 62px;\n      width: 100px;\n      .ant-number-picker-input-wrap {\n        width: calc(100% - 22px);\n        .ant-number-picker-input {\n          width: 100%;\n          input {\n            text-align: left;\n            padding: 0 8px;\n          }\n        }\n      }\n    }\n    .ant-table {\n      table {\n        table-layout: auto;\n      }\n    }\n    .ant-rating-medium {\n      min-height: 30px;\n      line-height: 30px;\n    }\n    .ant-rating-small {\n      min-height: 24px;\n      line-height: 24px;\n    }\n    .ant-rating-large {\n      min-height: 40px;\n      line-height: 40px;\n    }\n  "]);

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
  var data = _taggedTemplateLiteralLoose(["\n  margin-bottom: 6px;\n  .ant-form-item-control {\n    display: block;\n    line-height: 32px;\n  }\n  &.field-table {\n    .ant-form-item-control {\n      overflow: auto;\n    }\n  }\n  .antd-uploader {\n    display: block;\n  }\n  .ant-form-item-msg {\n    &.ant-form-item-space {\n      min-height: 20px;\n      .ant-form-item-help,\n      .ant-form-item-extra {\n        margin-top: 0;\n        line-height: 1.5;\n      }\n    }\n  }\n  .ant-form-item-extra {\n    color: #888;\n    font-size: 12px;\n    line-height: 1.7;\n  }\n  &.ant-form-item.ant-row {\n    display: flex;\n  }\n  .ant-col {\n    padding-right: 0;\n  }\n  .ant-card-head {\n    background: none;\n  }\n  .ant-form-item-label label:after {\n    content: '';\n  }\n  .ant-form-item-label label {\n    color: #666;\n    font-size: 12px;\n  }\n  ul {\n    padding: 0;\n    li {\n      margin: 0;\n      & + li {\n        margin: 0;\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

/**
 * 轻量级 Form，不包含任何数据管理能力
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
        prefix = _this$props2.prefix,
        noMinHeight = _this$props2.noMinHeight,
        size = _this$props2.size,
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
    return _react.default.createElement(_antd.Popover, {
      closable: false,
      placement: "top",
      content: this.props.extra
    }, _react.default.createElement(_antd.Icon, {
      type: "question-circle",
      size: "small"
    }));
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
  prefix: 'ant-'
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
  OriginForm = (0, _styledComponents.default)(OriginForm)(_templateObject2());

  var Form =
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
          var errors = container.querySelectorAll('.ant-form-item-help');

          if (errors && errors.length) {
            var node = getParentNode(errors[0], '.ant-form-item');

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

      var formClassName = (0, _classnames.default)((_classNames3 = {}, _classNames3[prefix + "form"] = true, _classNames3[prefix + "inline"] = inline, _classNames3["" + prefix + size] = size, _classNames3[prefix + "form-" + labelAlign] = !!labelAlign, _classNames3[className] = !!className, _classNames3));
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
  }(_react.default.Component);

  _defineProperty(Form, "defaultProps", {
    component: 'form',
    prefix: 'ant-',
    size: 'medium',
    labelAlign: 'left',
    locale: _locale.default,
    autoAddColon: true
  });

  _defineProperty(Form, "displayName", 'SchemaForm');

  Form.LOCALE = _locale.default;
  return Form;
});

var isTableColItem = function isTableColItem(path, getSchema) {
  var schema = getSchema(path);
  return schema && schema.type === 'array' && schema['x-component'] === 'table';
};

(0, _react2.registerFieldMiddleware)(function (Field) {
  return function (props) {
    var name = props.name,
        errors = props.errors,
        path = props.path,
        editable = props.editable,
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