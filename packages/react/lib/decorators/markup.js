"use strict";

exports.__esModule = true;
exports.SchemaMarkup = exports.SchemaField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _context = require("../shared/context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var nonameId = 0;

var getRadomName = function getRadomName() {
  return "RS_UFORM_NO_NAME_$" + nonameId++;
};

var SchemaField = function SchemaField(props, context) {
  var parent = (0, _react.useContext)(_context.MarkupContext);

  if ((0, _utils.schemaIs)(parent, 'object')) {
    var name = props.name || getRadomName();
    parent.properties = parent.properties || {};
    parent.properties[name] = (0, _utils.clone)(props, _utils.filterSchemaPropertiesAndReactChildren);
    return _react.default.createElement(_context.MarkupContext.Provider, {
      value: parent.properties[name]
    }, props.children);
  } else if ((0, _utils.schemaIs)(parent, 'array')) {
    parent.items = (0, _utils.clone)(props, _utils.filterSchemaPropertiesAndReactChildren);
    return _react.default.createElement(_context.MarkupContext.Provider, {
      value: parent.items
    }, props.children);
  } else {
    return props.children || _react.default.createElement(_react.default.Fragment, null);
  }
};

exports.SchemaField = SchemaField;
var SchemaMarkup = (0, _utils.createHOC)(function (options, SchemaForm) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(_class, _Component);

    function _class() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          children = _this$props.children,
          initialValues = _this$props.initialValues,
          defaultValue = _this$props.defaultValue,
          value = _this$props.value,
          schema = _this$props.schema,
          others = _objectWithoutPropertiesLoose(_this$props, ["children", "initialValues", "defaultValue", "value", "schema"]);

      schema = schema || {
        type: 'object'
      };
      nonameId = 0;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("template", null, _react.default.createElement(_context.MarkupContext.Provider, {
        value: schema
      }, children)), _react.default.createElement(SchemaForm, _extends({}, others, {
        defaultValue: value || defaultValue,
        value: value,
        initialValues: initialValues,
        schema: schema
      }), children));
    };

    return _class;
  }(_react.Component), _defineProperty(_class, "displayName", 'SchemaMarkupParser'), _temp;
});
exports.SchemaMarkup = SchemaMarkup;