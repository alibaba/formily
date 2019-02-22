"use strict";

exports.__esModule = true;
var _exportNames = {
  raf: true,
  caf: true,
  resolveFieldPath: true,
  isChildField: true,
  hasRequired: true,
  publishFormState: true,
  publishFieldState: true
};
exports.publishFieldState = exports.publishFormState = exports.hasRequired = exports.isChildField = exports.resolveFieldPath = exports.caf = exports.raf = void 0;

var _scheduler = require("scheduler");

var _utils = require("@uform/utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _utils[key];
});

/* eslint-disable camelcase */

/* eslint-disable camelcase */
var self = void 0 || global || window;
var raf = self.requestAnimationFrame && (_scheduler.scheduleCallback || _scheduler.unstable_scheduleCallback || self.requestAnimationFrame) || self.setTimeout;
exports.raf = raf;
var caf = self.requestAnimationFrame && (_scheduler.cancelCallback || _scheduler.unstable_cancelCallback || self.cancelAnimationFrame) || self.clearTimeout;
exports.caf = caf;

var resolveFieldPath = function resolveFieldPath(path) {
  if (!(0, _utils.isArr)(path)) {
    return (0, _utils.isStr)(path) ? resolveFieldPath((0, _utils.getPathSegments)(path)) : undefined;
  }

  return path.reduce(function (buf, key) {
    return buf.concat((0, _utils.getPathSegments)(key));
  }, []);
};

exports.resolveFieldPath = resolveFieldPath;

var isChildField = function isChildField(field, parent) {
  if (field && parent && field.path && parent.path) {
    for (var i = 0; i < parent.path.length; i++) {
      if (field.path[i] !== parent.path[i]) {
        return false;
      }
    }

    return parent.path.length < field.path.length;
  }

  return false;
};

exports.isChildField = isChildField;

var hasRequired = function hasRequired(rules) {
  return (0, _utils.toArr)(rules).some(function (rule) {
    return rule && rule.required;
  });
};

exports.hasRequired = hasRequired;

var publishFormState = function publishFormState(state) {
  var values = state.values,
      valid = state.valid,
      invalid = state.invalid,
      errors = state.errors,
      pristine = state.pristine,
      dirty = state.dirty;
  return {
    values: values,
    valid: valid,
    invalid: invalid,
    errors: errors,
    pristine: pristine,
    dirty: dirty
  };
};

exports.publishFormState = publishFormState;

var publishFieldState = function publishFieldState(state) {
  var value = state.value,
      valid = state.valid,
      invalid = state.invalid,
      errors = state.errors,
      visible = state.visible,
      editable = state.editable,
      initialValue = state.initialValue,
      name = state.name,
      path = state.path,
      props = state.props,
      effectErrors = state.effectErrors,
      loading = state.loading,
      pristine = state.pristine,
      required = state.required,
      rules = state.rules;
  return {
    value: value,
    valid: valid,
    invalid: invalid,
    editable: editable,
    visible: visible,
    loading: loading,
    errors: errors.concat(effectErrors),
    pristine: pristine,
    initialValue: initialValue,
    name: name,
    path: path,
    props: props,
    required: required,
    rules: rules
  };
};

exports.publishFieldState = publishFieldState;