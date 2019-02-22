"use strict";

exports.__esModule = true;
exports.ArrayField = exports.TextButton = exports.CircleButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@uform/react");

var _utils = require("@uform/utils");

var _antd = require("antd");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n    border: 1px solid #eee;\n    min-width: 400px;\n    .array-item {\n      padding: 20px;\n      padding-bottom: 0;\n      padding-top: 30px;\n      border-bottom: 1px solid #eee;\n      position: relative;\n      &:nth-child(even) {\n        background: #fafafa;\n      }\n      .array-index {\n        position: absolute;\n        top: 0;\n        left: 0;\n        display: block;\n        span {\n          position: absolute;\n          color: rgb(255, 255, 255);\n          z-index: 1;\n          font-size: 12px;\n          top: 3px;\n          left: 3px;\n          line-height: initial;\n        }\n        &::after {\n          content: '';\n          display: block;\n          border-top: 20px solid transparent;\n          border-left: 20px solid transparent;\n          border-bottom: 20px solid transparent;\n          border-right: 20px solid #888;\n          transform: rotate(45deg);\n          position: absolute;\n          z-index: 0;\n          top: -20px;\n          left: -20px;\n        }\n      }\n      .array-item-operator {\n        display: flex;\n        border-top: 1px solid #eee;\n        padding-top: 20px;\n      }\n    }\n    .array-empty-wrapper {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n      .array-empty {\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        margin: 20px;\n        img {\n          display: block;\n          height: 80px;\n        }\n        .ant-btn-text {\n          color: #999;\n        }\n      }\n    }\n    .array-item-wrapper {\n      margin: 0 -20px;\n    }\n    .array-item-addition {\n      padding: 10px 20px;\n      line-height: normal !important;\n      background: #fbfbfb;\n      .ant-btn-text {\n        color: #888;\n      }\n    }\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n      display: inline-block;\n      width: auto;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  width: 100%;\n  height: 20px;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  width:30px;\n  height:30px;\n  margin-right:10px;\n  border-radius: 100px;\n  border: 1px solid #eee;\n  margin-bottom:20px;\n  cursor:pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  &:hover{\n    background:#f7f4f4;\n  }\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var CircleButton = _styledComponents.default.div(_templateObject());

exports.CircleButton = CircleButton;

var TextButton = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.inline && (0, _styledComponents.css)(_templateObject3());
});

exports.TextButton = TextButton;

var ArrayField =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ArrayField, _React$Component);

  function ArrayField() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ArrayField.prototype;

  _proto.renderEmpty = function renderEmpty(disabled) {
    var _this$props = this.props,
        locale = _this$props.locale,
        mutators = _this$props.mutators;
    return _react.default.createElement("div", {
      className: "array-empty-wrapper",
      onClick: function onClick() {
        mutators.push();
      }
    }, _react.default.createElement("div", {
      className: "array-empty"
    }, _react.default.createElement("img", {
      src: "//img.alicdn.com/tfs/TB1y2nwp_tYBeNjy1XdXXXXyVXa-200-200.png"
    }), !disabled && _react.default.createElement(TextButton, null, _react.default.createElement(_antd.Icon, {
      type: "plus"
    }), locale.addItem || '添加')));
  };

  _proto.renderAddition = function renderAddition() {
    var locale = this.props.locale;
    return _react.default.createElement("div", {
      className: "array-item-addition"
    }, _react.default.createElement(TextButton, {
      inline: true,
      onClick: this.onAddHandler()
    }, _react.default.createElement(_antd.Icon, {
      type: "plus"
    }), locale.addItem || '添加'));
  };

  _proto.getDisabled = function getDisabled() {
    var _this$props2 = this.props,
        schema = _this$props2.schema,
        editable = _this$props2.editable,
        name = _this$props2.name;
    var disabled = schema['x-props'] && schema['x-props'].disabled;

    if (editable !== undefined) {
      if ((0, _utils.isFn)(editable)) {
        if (!editable(name)) {
          return true;
        }
      } else if (editable === false) {
        return true;
      }
    }

    return disabled;
  };

  _proto.controllable = function controllable(key, value) {
    var schema = this.props.schema;
    var readOnly = schema['x-props'] && schema['x-props'].readOnly;
    var disabled = this.getDisabled();

    if ((0, _utils.isFn)(disabled)) {
      return disabled(key, value);
    } else if ((0, _utils.isFn)(readOnly)) {
      return readOnly(key, value);
    } else {
      return !readOnly && !disabled;
    }
  };

  _proto.onRemoveHandler = function onRemoveHandler(index) {
    var _this$props3 = this.props,
        value = _this$props3.value,
        mutators = _this$props3.mutators,
        schema = _this$props3.schema,
        locale = _this$props3.locale;
    var minItems = schema.minItems;
    return function (e) {
      e.stopPropagation();

      if (minItems >= 0 && value.length - 1 < minItems) {
        mutators.errors(locale.array_invalid_minItems, minItems);
      } else {
        mutators.remove(index);
      }
    };
  };

  _proto.onMoveHandler = function onMoveHandler(_from, to) {
    var mutators = this.props.mutators;
    return function (e) {
      e.stopPropagation();
      mutators.move(_from, to);
    };
  };

  _proto.onAddHandler = function onAddHandler() {
    var _this$props4 = this.props,
        value = _this$props4.value,
        mutators = _this$props4.mutators,
        schema = _this$props4.schema,
        locale = _this$props4.locale;
    var maxItems = schema.maxItems;
    return function (e) {
      e.stopPropagation();

      if (maxItems >= 0 && value.length + 1 > maxItems) {
        mutators.errors(locale.array_invalid_maxItems, maxItems);
      } else {
        mutators.push();
      }
    };
  };

  _proto.onClearErrorHandler = function onClearErrorHandler() {
    var _this = this;

    return function () {
      var _this$props5 = _this.props,
          value = _this$props5.value,
          mutators = _this$props5.mutators,
          schema = _this$props5.schema;
      var maxItems = schema.maxItems,
          minItems = schema.minItems;

      if (maxItems >= 0 && value.length <= maxItems || minItems >= 0 && value.length >= minItems) {
        mutators.errors();
      }
    };
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this$props6 = this.props,
        value = _this$props6.value,
        mutators = _this$props6.mutators,
        schema = _this$props6.schema,
        locale = _this$props6.locale;
    var maxItems = schema.maxItems,
        minItems = schema.minItems;

    if (value.length > maxItems) {
      mutators.errors(locale.array_invalid_maxItems, maxItems);
    } else if (value.length < minItems) {
      mutators.errors(locale.array_invalid_minItems, minItems);
    }
  };

  return ArrayField;
}(_react.default.Component);

exports.ArrayField = ArrayField;
(0, _react2.registerFormField)('array', (0, _styledComponents.default)(
/*#__PURE__*/
function (_ArrayField) {
  _inheritsLoose(_class, _ArrayField);

  function _class() {
    return _ArrayField.apply(this, arguments) || this;
  }

  var _proto2 = _class.prototype;

  _proto2.render = function render() {
    var _this2 = this;

    var _this$props7 = this.props,
        className = _this$props7.className,
        name = _this$props7.name,
        schema = _this$props7.schema,
        value = _this$props7.value,
        renderField = _this$props7.renderField;
    var style = schema['x-props'] && schema['x-props'].style || {};
    return _react.default.createElement("div", {
      className: className,
      style: style,
      onClick: this.onClearErrorHandler()
    }, value.map(function (item, index) {
      return _react.default.createElement("div", {
        className: "array-item",
        key: name + "." + index
      }, _react.default.createElement("div", {
        className: "array-index"
      }, _react.default.createElement("span", null, index + 1)), _react.default.createElement("div", {
        className: "array-item-wrapper"
      }, renderField(index)), _react.default.createElement("div", {
        className: "array-item-operator"
      }, _this2.controllable(index + ".remove", item) && _react.default.createElement(CircleButton, {
        onClick: _this2.onRemoveHandler(index)
      }, _react.default.createElement(_antd.Icon, {
        size: "xs",
        type: "delete"
      })), value.length > 1 && _this2.controllable(index + ".moveDown", item) && _react.default.createElement(CircleButton, {
        onClick: _this2.onMoveHandler(index, index + 1 > value.length - 1 ? 0 : index + 1)
      }, _react.default.createElement(_antd.Icon, {
        size: "xs",
        type: "down"
      })), value.length > 1 && _this2.controllable(index + ".moveUp", item) && _react.default.createElement(CircleButton, {
        onClick: _this2.onMoveHandler(index, index - 1 < 0 ? value.length - 1 : index - 1)
      }, _react.default.createElement(_antd.Icon, {
        size: "xs",
        type: "up"
      }))));
    }), value.length === 0 && this.renderEmpty(), value.length > 0 && this.controllable('addition', value) && this.renderAddition());
  };

  return _class;
}(ArrayField))(_templateObject4()));