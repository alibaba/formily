"use strict";

exports.__esModule = true;
var _exportNames = {
  createForm: true,
  setValidationLocale: true,
  setValidationLanguage: true
};
exports.default = exports.createForm = void 0;

var _form = require("./form");

var _validator = require("@uform/validator");

exports.setValidationLocale = _validator.setLocale;
exports.setValidationLanguage = _validator.setLanguage;

var _utils = require("./utils");

var _path = require("./path");

Object.keys(_path).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _path[key];
});

var createForm = function createForm(_ref) {
  var initialValues = _ref.initialValues,
      onSubmit = _ref.onSubmit,
      onReset = _ref.onReset,
      schema = _ref.schema,
      onFormChange = _ref.onFormChange,
      onFieldChange = _ref.onFieldChange,
      onFormWillInit = _ref.onFormWillInit,
      subscribes = _ref.subscribes,
      effects = _ref.effects,
      onValidateFailed = _ref.onValidateFailed;
  var fields = [];
  initialValues = (0, _utils.caculateSchemaInitialValues)(schema, initialValues, function (_ref2, schema, value) {
    var name = _ref2.name,
        path = _ref2.path,
        schemaPath = _ref2.schemaPath;
    fields.push({
      name: name,
      path: path,
      schemaPath: schemaPath,
      schema: schema,
      value: value
    });
  });
  var form = new _form.Form({
    initialValues: initialValues,
    onSubmit: onSubmit,
    onReset: onReset,
    subscribes: subscribes,
    onFormChange: onFormChange,
    onFieldChange: onFieldChange,
    effects: effects,
    onValidateFailed: onValidateFailed,
    schema: schema
  });

  if ((0, _utils.isFn)(onFormWillInit)) {
    onFormWillInit(form);
  }

  fields = fields.map(function (_ref3) {
    var name = _ref3.name,
        path = _ref3.path,
        schemaPath = _ref3.schemaPath,
        schema = _ref3.schema,
        value = _ref3.value;
    return form.registerField(name || schemaPath.join('.'), {
      rules: schema['x-rules'],
      path: schemaPath,
      props: schema
    });
  });
  form.syncUpdate(function () {
    form.triggerEffect('onFormInit', form.publishState());
    fields.forEach(function (field) {
      form.triggerEffect('onFieldChange', field.publishState());
    });
  });
  return form;
};

exports.createForm = createForm;
var _default = createForm;
exports.default = _default;