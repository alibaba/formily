"use strict";

exports.__esModule = true;
exports.FormSlot = exports.createVirtualBox = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("./core");

var _markup = require("../decorators/markup");

var _field = require("../state/field");

var _utils = require("../utils");

var _pascalCase = _interopRequireDefault(require("pascal-case"));

var _class2, _temp2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createVirtualBox = function createVirtualBox(name, component) {
  var _class, _temp;

  (0, _utils.registerVirtualbox)(name);
  (0, _core.registerFormField)(name, (0, _field.StateField)()((_temp = _class =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inheritsLoose(_class, _React$PureComponent);

    function _class() {
      return _React$PureComponent.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          schema = _this$props.schema,
          schemaPath = _this$props.schemaPath,
          path = _this$props.path,
          getOrderProperties = _this$props.getOrderProperties;
      var parentPath = path.slice(0, path.length - 1);
      var properties = getOrderProperties(this.props);
      var children = properties.map(function (_ref) {
        var key = _ref.key;
        var newPath = parentPath.concat(key);
        var newName = newPath.join('.');
        var newSchemaPath = schemaPath.concat(key);
        return _react.default.createElement(_core.FormField, {
          key: newSchemaPath,
          name: newName,
          path: newPath,
          schemaPath: newSchemaPath
        });
      });
      return _react.default.createElement(component, schema['x-props'], children);
    };

    return _class;
  }(_react.default.PureComponent), _defineProperty(_class, "displayName", 'VirtualBoxWrapper'), _temp)), true);

  var VirtualBox = function VirtualBox(_ref2) {
    var children = _ref2.children,
        fieldName = _ref2.name,
        render = _ref2.render,
        props = _objectWithoutPropertiesLoose(_ref2, ["children", "name", "render"]);

    return _react.default.createElement(_markup.SchemaField, {
      type: "object",
      name: fieldName,
      "x-component": name,
      "x-props": props,
      "x-render": render
    }, children);
  };

  if (component.defaultProps) {
    VirtualBox.defaultProps = component.defaultProps;
  }

  VirtualBox.displayName = (0, _pascalCase.default)(name);
  return VirtualBox;
};

exports.createVirtualBox = createVirtualBox;
(0, _utils.registerVirtualbox)('slot');
(0, _core.registerFormField)('slot', (0, _field.StateField)()((_temp2 = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(_class2, _React$Component);

  function _class2() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto2 = _class2.prototype;

  _proto2.render = function render() {
    var schema = this.props.schema;
    return _react.default.createElement(_react.default.Fragment, null, schema.renderChildren);
  };

  return _class2;
}(_react.default.Component), _defineProperty(_class2, "displayName", 'VirtualBoxWrapper'), _temp2)));

var FormSlot = function FormSlot(_ref3) {
  var name = _ref3.name,
      children = _ref3.children;
  return _react.default.createElement(_markup.SchemaField, {
    type: "object",
    name: name,
    "x-component": "slot",
    renderChildren: children
  });
};

exports.FormSlot = FormSlot;