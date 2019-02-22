"use strict";

exports.__esModule = true;
exports.OriginForm = exports.FormField = exports.getFormFieldPropsTransformer = exports.registerFormFieldPropsTransformer = exports.registerFieldRenderer = exports.registerFormWrapper = exports.registerFieldMiddleware = exports.registerFormFields = exports.registerFormField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _pascalCase = _interopRequireDefault(require("pascal-case"));

var _utils = require("../utils");

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var FIELD_WRAPPERS = [];
var FORM_FIELDS = {};
var FIELD_PROPS_TRANSFORMERS = {};
var FIELD_RENDERER;

var FORM_COMPONENT =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FORM_COMPONENT, _React$Component);

  function FORM_COMPONENT() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FORM_COMPONENT.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        formRef = _this$props.formRef,
        props = _objectWithoutPropertiesLoose(_this$props, ["formRef"]);

    return _react.default.createElement('form', _extends({}, props, {
      ref: formRef
    }));
  };

  return FORM_COMPONENT;
}(_react.default.Component);

FORM_COMPONENT.displayName = 'Form';

var registerFormField = function registerFormField(name, component, notWrapper) {
  if ((0, _utils.isStr)(name) && name && ((0, _utils.isFn)(component) || typeof component.styledComponentId === 'string')) {
    if (notWrapper) {
      FORM_FIELDS[(0, _utils.lowercase)(name)] = component;
      FORM_FIELDS[(0, _utils.lowercase)(name)].registerMiddlewares = [];
    } else {
      FORM_FIELDS[(0, _utils.lowercase)(name)] = (0, _utils.compose)(component, FIELD_WRAPPERS, true);
      FORM_FIELDS[(0, _utils.lowercase)(name)].registerMiddlewares = FIELD_WRAPPERS;
    }

    FORM_FIELDS[(0, _utils.lowercase)(name)].displayName = (0, _pascalCase.default)(name);
  }
};

exports.registerFormField = registerFormField;

var registerFormFields = function registerFormFields(object) {
  (0, _utils.each)(object, function (component, name) {
    registerFormField(name, component);
  });
};

exports.registerFormFields = registerFormFields;

var registerFieldMiddleware = function registerFieldMiddleware() {
  for (var _len = arguments.length, wrappers = new Array(_len), _key = 0; _key < _len; _key++) {
    wrappers[_key] = arguments[_key];
  }

  FIELD_WRAPPERS = FIELD_WRAPPERS.concat(wrappers);
  (0, _utils.each)(FORM_FIELDS, function (component, key) {
    if (!component.registerMiddlewares.some(function (wrapper) {
      return wrappers.indexOf(wrapper) > -1;
    })) {
      FORM_FIELDS[key] = (0, _utils.compose)(FORM_FIELDS[key], wrappers, true);
      FORM_FIELDS[key].registerMiddlewares = FIELD_WRAPPERS;
    }
  });
};

exports.registerFieldMiddleware = registerFieldMiddleware;

var registerFormWrapper = function registerFormWrapper() {
  for (var _len2 = arguments.length, wrappers = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    wrappers[_key2] = arguments[_key2];
  }

  FORM_COMPONENT = wrappers.reduce(function (buf, fn, index) {
    var comp = (0, _utils.isFn)(fn) ? fn(buf) : buf;
    comp.displayName = "FormWrapperLevel" + index;
    return comp;
  }, FORM_COMPONENT);
};

exports.registerFormWrapper = registerFormWrapper;

var registerFieldRenderer = function registerFieldRenderer(renderer) {
  FIELD_RENDERER = renderer;
};

exports.registerFieldRenderer = registerFieldRenderer;

var registerFormFieldPropsTransformer = function registerFormFieldPropsTransformer(name, transformer) {
  if ((0, _utils.isFn)(transformer)) {
    FIELD_PROPS_TRANSFORMERS[name] = transformer;
  }
};

exports.registerFormFieldPropsTransformer = registerFormFieldPropsTransformer;

var getFormFieldPropsTransformer = function getFormFieldPropsTransformer(name) {
  return FIELD_PROPS_TRANSFORMERS[name];
};

exports.getFormFieldPropsTransformer = getFormFieldPropsTransformer;

var FormField = function FormField(props) {
  var _useContext = (0, _react.useContext)(_context.StateContext),
      getSchema = _useContext.getSchema;

  var schema = getSchema(props.schemaPath || props.path) || {};
  var fieldName = (0, _utils.lowercase)(schema['x-component'] || schema.type);
  var component = schema['x-render'] ? FIELD_RENDERER : FORM_FIELDS[fieldName];

  if (component) {
    return _react.default.createElement(component, _extends({}, props, {
      schema: schema,
      path: props.path,
      name: props.name,
      getSchema: getSchema,
      renderComponent: schema['x-render'] ? function ($props) {
        return _react.default.createElement(FORM_FIELDS[fieldName], _extends({}, props, $props, {
          schema: schema,
          path: props.path,
          name: props.name
        }));
      } : undefined
    }));
  } else {
    if (console && console.error) {
      if (fieldName) {
        console.error("The schema field `" + fieldName + "`'s component is not found.");
      } else {
        console.error("The schema field's component is not found, or field's schema is not defined.");
      }
    }

    return _react.default.createElement(_react.default.Fragment, null);
  }
};

exports.FormField = FormField;

var OriginForm = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(FORM_COMPONENT, _extends({}, props, {
    ref: ref
  }));
});

exports.OriginForm = OriginForm;