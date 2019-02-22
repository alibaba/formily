"use strict";

exports.__esModule = true;
var _exportNames = {
  runValidation: true,
  format: true
};
exports.default = exports.runValidation = void 0;

var _utils = require("./utils");

exports.format = _utils.format;

var _validators = require("./validators");

var _message = require("./message");

Object.keys(_message).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _message[key];
});

var flatArr = function flatArr(arr) {
  return (0, _utils.reduce)(arr, function (buf, item) {
    return (0, _utils.isArr)(item) ? buf.concat(flatArr(item)) : item ? buf.concat(item) : buf;
  }, []);
};

var runValidation = function runValidation(values, fieldMap, forceUpdate, callback) {
  var queue = [];

  if ((0, _utils.isFn)(forceUpdate)) {
    callback = forceUpdate;
    forceUpdate = false;
  }

  (0, _utils.each)(fieldMap, function (field, name) {
    var value = (0, _utils.getIn)(values, name);
    if (field.visible === false || field.editable === false) return;
    if ((0, _utils.isEqual)(field.__lastValidateValue, value) && !forceUpdate) return;
    var title = field.props && field.props.title;
    var rafId = setTimeout(function () {
      field.loading = true;
      field.dirty = true;
      if (field.notify) field.notify();
    }, 100);
    queue.push(Promise.all((0, _utils.toArr)(field.rules).map(function (rule) {
      return (0, _validators.validate)(value, rule, values, title || name);
    })).then(function (errors) {
      clearTimeout(rafId);
      var lastFieldErrors = field.errors;
      var lastValid = field.valid;
      var lastLoading = field.loading;
      field.loading = false;

      if (forceUpdate) {
        if (errors) field.errors = flatArr((0, _utils.toArr)(errors));

        if (field.errors.length) {
          field.valid = false;
          field.invalid = true;
        } else {
          field.valid = true;
          field.invalid = false;
        }

        if (field.errors && field.errors.length) {
          field.dirty = true;
        }
      } else {
        if (!field.pristine) {
          if (errors) field.errors = flatArr((0, _utils.toArr)(errors));

          if (field.errors.length) {
            field.valid = false;
            field.invalid = true;
          } else {
            field.valid = true;
            field.invalid = false;
          }

          if (!(0, _utils.isEqual)(lastValid, field.valid) || !(0, _utils.isEqual)(lastFieldErrors, field.errors)) {
            field.dirty = true;
          }
        }
      }

      if (field.loading !== lastLoading) {
        field.dirty = true;
      }

      if (field.dirty && field.notify) {
        field.notify();
      }

      field.__lastValidateValue = (0, _utils.clone)(value);
      return {
        name: name,
        value: value,
        field: field,
        invalid: field.invalid,
        valid: field.valid,
        errors: field.errors
      };
    }));
  });
  return Promise.all(queue).then(function (response) {
    if ((0, _utils.isFn)(callback)) {
      callback(response);
    }

    return response;
  });
};

exports.runValidation = runValidation;
var _default = runValidation;
exports.default = _default;