"use strict";

exports.__esModule = true;
var _exportNames = {
  SchemaForm: true,
  Field: true,
  setValidationLocale: true,
  setValidationLanguage: true,
  createFormActions: true,
  registerFieldMiddleware: true,
  registerFormFieldPropsTransformer: true,
  registerFormField: true,
  registerFormFields: true,
  registerFormWrapper: true,
  caculateSchemaInitialValues: true,
  FormPath: true
};
exports.default = exports.createFormActions = exports.setValidationLanguage = exports.setValidationLocale = exports.Field = exports.SchemaForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("./shared/core");

exports.registerFieldMiddleware = _core.registerFieldMiddleware;
exports.registerFormFieldPropsTransformer = _core.registerFormFieldPropsTransformer;
exports.registerFormField = _core.registerFormField;
exports.registerFormFields = _core.registerFormFields;
exports.registerFormWrapper = _core.registerFormWrapper;

var _utils = require("./utils");

exports.caculateSchemaInitialValues = _utils.caculateSchemaInitialValues;

var _markup = require("./decorators/markup");

var _validator = require("@uform/validator");

var _core2 = require("@uform/core");

exports.FormPath = _core2.FormPath;

var _reactEva = require("react-eva");

require("./state");

require("./shared/object");

require("./shared/render");

var _virtualbox = require("./shared/virtualbox");

Object.keys(_virtualbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _virtualbox[key];
});

var _connect = require("./decorators/connect");

Object.keys(_connect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _connect[key];
});

var _broadcast = require("./shared/broadcast");

Object.keys(_broadcast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _broadcast[key];
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SchemaForm = (0, _markup.SchemaMarkup)()(_react.default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      others = _objectWithoutPropertiesLoose(props, ["children", "className"]);

  return _react.default.createElement(_core.OriginForm, _extends({
    className: "rs-uform " + (className || '')
  }, others, {
    ref: ref
  }), _react.default.createElement("div", {
    className: "rs-uform-content"
  }, _react.default.createElement(_core.FormField, {
    name: "",
    path: [],
    schemaPath: []
  })), children);
}));
exports.SchemaForm = SchemaForm;
var Field = _markup.SchemaField;
exports.Field = Field;
var setValidationLocale = _validator.setLocale;
exports.setValidationLocale = setValidationLocale;
var setValidationLanguage = _validator.setLanguage;
exports.setValidationLanguage = setValidationLanguage;

var createFormActions = function createFormActions() {
  return (0, _reactEva.createActions)('getFormState', 'getFieldState', 'setFormState', 'setFieldState', 'getSchema', 'reset', 'submit', 'validate');
};

exports.createFormActions = createFormActions;
SchemaForm.displayName = 'SchemaForm';
var _default = SchemaForm;
exports.default = _default;