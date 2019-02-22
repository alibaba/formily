"use strict";

exports.__esModule = true;
exports.Form = void 0;

var _utils = require("./utils");

var _field3 = require("./field");

var _validator = require("@uform/validator");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _path = require("./path");

var _immer = _interopRequireDefault(require("immer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var defaults = function defaults(opts) {
  return _extends({
    initialValues: {},
    onSubmit: function onSubmit(values) {},
    effects: function effects($) {}
  }, opts);
};

var Form =
/*#__PURE__*/
function () {
  function Form(opts) {
    var _this = this;

    _defineProperty(this, "triggerEffect", function (eventName) {
      if (_this.subscribes[eventName]) {
        var _this$subscribes$even;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (_this$subscribes$even = _this.subscribes[eventName]).next.apply(_this$subscribes$even, args);
      }
    });

    _defineProperty(this, "setFieldState", function (path, buffer, callback) {
      if (_this.destructed) return;

      if ((0, _utils.isFn)(buffer)) {
        callback = buffer;
        buffer = false;
      }

      if ((0, _utils.isStr)(path) || (0, _utils.isArr)(path) || (0, _utils.isFn)(path)) {
        _this.updateQueue.push({
          path: path,
          callback: callback
        });
      }

      return new Promise(function (resolve) {
        if (_this.syncUpdateMode) {
          _this.updateFieldStateFromQueue(buffer);

          resolve();
        }

        if (_this.updateQueue.length > 0) {
          if (_this.updateRafId) (0, _utils.caf)(_this.updateRafId);
          _this.updateRafId = (0, _utils.raf)(function () {
            if (_this.destructed) return;

            _this.updateFieldStateFromQueue(buffer);

            resolve();
          });
        }
      });
    });

    _defineProperty(this, "getFieldState", function (path, callback) {
      var field;
      (0, _utils.each)(_this.fields, function (_field) {
        if (_field.pathEqual(path)) {
          field = _field;
          return false;
        }
      });

      if (field) {
        return (0, _utils.isFn)(callback) ? callback(field.publishState()) : field.publishState();
      }
    });

    _defineProperty(this, "getFormState", function (callback) {
      return (0, _utils.isFn)(callback) ? callback(_this.publishState()) : _this.publishState();
    });

    _defineProperty(this, "setFormState", function (reducer) {
      if (!(0, _utils.isFn)(reducer)) return;
      return new Promise(function (resolve) {
        var published = (0, _immer.default)((0, _utils.clone)(_this.publishState()), reducer);

        _this.checkState(published);

        resolve();
      });
    });

    this.options = defaults(opts);
    this.formbrd = new _utils.Broadcast();
    this.initialized = false;
    this.state = {};
    this.fields = {};
    this.subscribes = opts.subscribes || {};
    this.updateQueue = [];
    this.updateBuffer = {};
    this.schema = opts.schema || {};
    this.initialize(this.options.initialValues);
    this.initializeEffects();
    this.initialized = true;
    this.destructed = false;
    this.fieldSize = 0;
  }

  var _proto = Form.prototype;

  _proto.initialize = function initialize(values) {
    if (values === void 0) {
      values = this.state.initialValues;
    }

    var lastValues = this.state.values;
    var lastDirty = this.state.dirty;
    this.state = {
      valid: true,
      invalid: false,
      errors: [],
      pristine: true,
      initialValues: (0, _utils.clone)(values) || {},
      values: values || {},
      dirty: lastDirty || (this.initialized ? !(0, _utils.isEqual)(values, lastValues) : false)
    };

    if (this.options.onFormChange && !this.initialized) {
      this.subscribe(this.options.onFormChange);
      this.options.onFormChange({
        formState: this.publishState()
      });
    }

    this.updateFieldsValue();
  };

  _proto.changeValues = function changeValues(values) {
    var lastValues = this.state.values;
    var lastDirty = this.state.dirty;
    this.state.values = values || {};
    this.state.dirty = lastDirty || (this.initialized ? !(0, _utils.isEqual)(values, lastValues) : false);
    this.updateFieldsValue();
  };

  _proto.initializeEffects = function initializeEffects() {
    var _this2 = this;

    var effects = this.options.effects;

    if ((0, _utils.isFn)(effects)) {
      effects(function (eventName, $filter) {
        if (!_this2.subscribes[eventName]) {
          _this2.subscribes[eventName] = new _rxjs.Subject();
        }

        if ((0, _utils.isStr)($filter) || (0, _utils.isFn)($filter)) {
          return _this2.subscribes[eventName].pipe((0, _operators.filter)((0, _utils.isStr)($filter) ? _path.FormPath.match($filter) : $filter));
        }

        return _this2.subscribes[eventName];
      }, {
        setFieldState: this.setFieldState,
        getFieldState: this.getFieldState,
        getFormState: this.getFormState,
        setFormState: this.setFormState
      });
    }
  };

  _proto.checkState = function checkState(published) {
    if (!(0, _utils.isEqual)(this.state.values, published.values)) {
      this.state.values = published.values;
      this.state.dirty = true;
      this.updateFieldsValue();
    }

    if (!(0, _utils.isEqual)(this.state.initialValues, published.initialValues)) {
      this.state.initialValues = published.initialValues;
      this.state.dirty = true;
      this.updateFieldInitialValue();
    }
  };

  _proto.syncUpdate = function syncUpdate(fn) {
    if ((0, _utils.isFn)(fn)) {
      this.syncUpdateMode = true;
      fn();
      this.syncUpdateMode = false;
    }
  };

  _proto.asyncUpdate = function asyncUpdate(fn) {
    if ((0, _utils.isFn)(fn)) {
      if (this.syncUpdateMode) {
        this.syncUpdateMode = false;
        fn();
        this.syncUpdateMode = true;
      } else {
        fn();
      }
    }
  };

  _proto.updateFieldStateFromQueue = function updateFieldStateFromQueue(buffer) {
    var _this3 = this;

    var failed = {};
    var rafIdMap = {};
    (0, _utils.each)(this.updateQueue, function (_ref, i) {
      var path = _ref.path,
          callback = _ref.callback;
      (0, _utils.each)(_this3.fields, function (field) {
        if (path && ((0, _utils.isFn)(path) || (0, _utils.isArr)(path) || (0, _utils.isStr)(path))) {
          if ((0, _utils.isFn)(path) ? path(field) : field.pathEqual(path)) {
            field.updateState(callback);

            if (_this3.syncUpdateMode) {
              field.dirty = false;
            }

            if (path.hasWildcard && !_this3.updateBuffer[path.string]) {
              _this3.updateBuffer[path.string] = {
                path: path,
                callback: callback
              };
            }

            if (field.dirty) {
              var dirtyType = field.dirtyType;
              field.notify();
              if (rafIdMap[field.name]) (0, _utils.caf)(rafIdMap[field.name]);
              rafIdMap[field.name] = (0, _utils.raf)(function () {
                if (dirtyType === 'value') {
                  _this3.internalValidate().then(function () {
                    _this3.formNotify(field.publishState());
                  });
                } else {
                  _this3.formNotify(field.publishState());
                }
              });
            }
          } else {
            failed[i] = failed[i] || 0;
            failed[i]++;

            if (_this3.fieldSize <= failed[i] && (buffer || path.hasWildcard)) {
              if ((0, _utils.isStr)(path) && !_this3.updateBuffer[path]) {
                _this3.updateBuffer.set(path, {
                  path: path,
                  callback: callback
                });
              } else if ((0, _utils.isFn)(path) && path.hasWildcard && !_this3.updateBuffer[path.string]) {
                _this3.updateBuffer[path.string] = {
                  path: path,
                  callback: callback
                };
              }
            }
          }
        }
      });
    });
    this.updateQueue = [];
  };

  _proto.updateFieldStateFromBuffer = function updateFieldStateFromBuffer(field) {
    var _this4 = this;

    var rafIdMap = {};
    (0, _utils.each)(this.updateBuffer, function (_ref2, key) {
      var path = _ref2.path,
          callback = _ref2.callback;

      if ((0, _utils.isFn)(path) ? path(field) : field.pathEqual(path)) {
        field.updateState(callback);

        if (_this4.syncUpdateMode) {
          field.dirty = false;
        }

        if (field.dirty) {
          var dirtyType = field.dirtyType;
          field.notify();
          if (rafIdMap[field.name]) (0, _utils.caf)(rafIdMap[field.name]);
          rafIdMap[field.name] = (0, _utils.raf)(function () {
            if (dirtyType === 'value') {
              _this4.internalValidate().then(function () {
                _this4.formNotify(field.publishState());
              });
            } else {
              _this4.formNotify(field.publishState());
            }
          });
        }

        if (!path.hasWildcard) {
          delete _this4.updateBuffer[key];
        }
      }
    });
  };

  _proto.internalValidate = function internalValidate(values, forceUpdate) {
    var _this5 = this;

    if (values === void 0) {
      values = this.state.values;
    }

    if (this.destructed) return;
    return new Promise(function (resolve) {
      if (_this5.rafValidateId) (0, _utils.caf)(_this5.rafValidateId);
      _this5.rafValidateId = (0, _utils.raf)(function () {
        if (_this5.destructed) return resolve();
        return (0, _validator.runValidation)(values || _this5.state.values, _this5.fields, forceUpdate).then(function (response) {
          var lastValid = _this5.state.valid;
          var _errors = [];
          _this5.state.valid = (0, _utils.every)(response, function (_ref3) {
            var valid = _ref3.valid,
                errors = _ref3.errors;
            _errors = _errors.concat(errors);
            return valid;
          });
          _this5.state.invalid = !_this5.state.valid;
          _this5.state.errors = _errors;

          if (_this5.state.valid !== lastValid) {
            _this5.state.dirty = true;
          }

          var lastPristine = _this5.state.pristine;

          if (!(0, _utils.isEqual)(_this5.state.values, _this5.state.initialValues)) {
            _this5.state.pristine = false;
          } else {
            _this5.state.pristine = true;
          }

          if (lastPristine !== _this5.state.pristine) {
            _this5.state.dirty = true;
          }

          return response;
        }).then(resolve);
      });
    });
  };

  _proto.registerField = function registerField(name, options) {
    var _this6 = this;

    var value = this.getValue(name);
    var initialValue = this.getInitialValue(name, options.path);
    var field = this.fields[name];

    if (field) {
      field.initialize(_extends({}, options, {
        value: value,
        initialValue: initialValue
      }));
      this.asyncUpdate(function () {
        _this6.updateFieldStateFromBuffer(field);
      });
      this.triggerEffect('onFieldChange', field.publishState());
    } else {
      this.fields[name] = new _field3.Field(this, {
        name: name,
        value: value !== undefined ? value : initialValue,
        path: options.path,
        initialValue: initialValue,
        rules: options.rules,
        props: options.props
      });
      var _field2 = this.fields[name];

      if (options.onChange) {
        this.asyncUpdate(function () {
          _this6.updateFieldStateFromBuffer(_field2);

          _field2.onChange(options.onChange);
        });
        this.triggerEffect('onFieldChange', _field2.publishState());
      }

      this.fieldSize++;
    }

    return this.fields[name];
  };

  _proto.setIn = function setIn(name, value) {
    (0, _utils.setIn)(this.state.values, name, value);
  };

  _proto.setInitialValueIn = function setInitialValueIn(name, value) {
    (0, _utils.setIn)(this.state.initialValues, name, value);
  };

  _proto.setValue = function setValue(name, value) {
    var _this7 = this;

    var field = this.fields[name];

    if (field) {
      field.updateState(function (state) {
        state.value = value;
      });
      field.pristine = false;

      if (field.dirty) {
        field.notify();
        this.internalValidate(this.state.values).then(function () {
          _this7.formNotify(field.publishState());
        });
      }
    }
  };

  _proto.removeValue = function removeValue(name) {
    var field = this.fields[name];

    if (field) {
      field.removeValue();
    }
  };

  _proto.setErrors = function setErrors(name, errors) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    errors = (0, _utils.toArr)(errors);
    var field = this.fields[name];

    if (field) {
      var lastErrors = field.errors;

      if (!(0, _utils.isEqual)(lastErrors, errors)) {
        field.errors = errors.map(function (msg) {
          return _validator.format.apply(void 0, [msg].concat(args));
        });

        if (errors.length) {
          field.invalid = true;
          field.valid = false;
        } else {
          field.invalid = false;
          field.valid = true;
        }

        field.dirty = true;
        field.notify();
      }
    }
  };

  _proto.updateChildrenValue = function updateChildrenValue(parent) {
    var _this8 = this;

    if (!parent.path) return;
    (0, _utils.each)(this.fields, function (field, $name) {
      if ((0, _utils.isChildField)(field, parent)) {
        var newValue = _this8.getValue($name);

        if (!(0, _utils.isEqual)(field.value, newValue)) {
          field.dirty = true;
          field.value = newValue;

          _this8.triggerEffect('onFieldChange', field.publishState());
        }
      }
    });
  };

  _proto.updateChildrenInitalValue = function updateChildrenInitalValue(parent) {
    var _this9 = this;

    if (!parent.path) return;
    (0, _utils.each)(this.fields, function (field, $name) {
      if ((0, _utils.isChildField)(field, parent)) {
        var newValue = _this9.getInitialValue($name);

        if (!(0, _utils.isEqual)(field.initialValue, newValue)) {
          field.dirty = true;
          field.initialValue = newValue;
        }
      }
    });
  };

  _proto.updateFieldInitialValue = function updateFieldInitialValue() {
    var _this10 = this;

    if (this.state.dirty && this.initialized) {
      (0, _utils.each)(this.fields, function (field, name) {
        var newValue = _this10.getInitialValue(name);

        field.initialValue = (0, _utils.clone)(newValue);
      });
    }
  };

  _proto.updateFieldsValue = function updateFieldsValue() {
    var _this11 = this;

    if (this.state.dirty && this.initialized) {
      this.internalValidate(this.state.values, true).then(function () {
        _this11.formNotify();

        (0, _utils.each)(_this11.fields, function (field, name) {
          var newValue = _this11.getValue(name);

          field.updateState(function (state) {
            state.value = (0, _utils.clone)(newValue);
          });

          if (field.dirty) {
            (0, _utils.raf)(function () {
              if (_this11.destructed) return;
              field.notify();
            });
          }
        });
      });
    }
  };

  _proto.updateChildrenVisible = function updateChildrenVisible(parent, visible) {
    var _this12 = this;

    if (!parent.path) return;
    (0, _utils.each)(this.fields, function (field, $name) {
      if ($name === parent.name) return;

      if ((0, _utils.isChildField)(field, parent)) {
        if (!visible) _this12.deleteIn($name);else {
          var value = field.value !== undefined ? field.value : (0, _utils.clone)(field.initialValue);
          if (field.value !== undefined) _this12.setIn($name, value);
        }

        if (field.visible !== visible) {
          field.visible = visible;
          field.dirty = true;
        }
      }
    });
  };

  _proto.getInitialValue = function getInitialValue(name, path) {
    var initialValue = (0, _utils.getIn)(this.state.initialValues, name);
    var schema, schemaDefault;

    if (initialValue === undefined) {
      schema = path ? (0, _utils.getSchemaNodeFromPath)(this.schema, path) : undefined;
      schemaDefault = schema && schema.default;

      if (schemaDefault !== undefined) {
        this.setIn(name, schemaDefault);
      }
    }

    return initialValue !== undefined ? initialValue : schemaDefault;
  };

  _proto.getValue = function getValue(name, copy) {
    return copy ? (0, _utils.clone)((0, _utils.getIn)(this.state.values, name)) : (0, _utils.getIn)(this.state.values, name);
  };

  _proto.deleteIn = function deleteIn(name) {
    (0, _utils.deleteIn)(this.state.values, name);
  };

  _proto.reset = function reset() {
    var _this13 = this;

    (0, _utils.each)(this.fields, function (field, name) {
      var value = _this13.getValue(name);

      var initialValue = _this13.getInitialValue(name, field.path);

      if (value === undefined && initialValue === undefined) return;
      field.updateState(function (state) {
        state.value = (0, _utils.clone)(initialValue);
      });

      if (field.dirty) {
        (0, _utils.raf)(function () {
          if (_this13.destructed) return;
          field.notify();
        });
      }
    });
    this.internalValidate(this.state.values, true).then(function () {
      _this13.formNotify();

      (0, _utils.raf)(function () {
        var formState = _this13.publishState();

        _this13.triggerEffect('onFormReset', formState);

        if ((0, _utils.isFn)(_this13.options.onReset)) {
          _this13.options.onReset({
            formState: formState
          });
        }
      });
    });
  };

  _proto.publishState = function publishState() {
    return (0, _utils.publishFormState)(this.state);
  };

  _proto.formNotify = function formNotify(fieldState) {
    var formState = this.publishState();

    if ((0, _utils.isFn)(this.options.onFieldChange)) {
      this.options.onFieldChange({
        formState: formState,
        fieldState: fieldState
      });
    }

    if (fieldState) this.triggerEffect('onFieldChange', fieldState);

    if (this.state.dirty) {
      this.formbrd.notify({
        formState: formState,
        fieldState: fieldState
      });
    }

    this.state.dirty = false;
    return formState;
  };

  _proto.validate = function validate() {
    var _this14 = this;

    return this.internalValidate(this.state.values, true).then(function () {
      return new Promise(function (resolve, reject) {
        _this14.formNotify();

        (0, _utils.raf)(function () {
          if (_this14.state.valid) {
            resolve(_this14.publishState());
          } else {
            if (_this14.options.onValidateFailed) {
              _this14.options.onValidateFailed(_this14.state.errors);
            }

            reject(_this14.state.errors);
          }
        });
      });
    });
  };

  _proto.submit = function submit() {
    var _this15 = this;

    return this.validate().then(function (formState) {
      _this15.triggerEffect('onFormSubmit', formState);

      if ((0, _utils.isFn)(_this15.options.onSubmit)) {
        _this15.options.onSubmit({
          formState: formState
        });
      }

      return formState;
    });
  };

  _proto.subscribe = function subscribe(callback) {
    return this.formbrd.subscribe(callback);
  };

  _proto.destructor = function destructor() {
    var _this16 = this;

    if (this.destructed) return;
    this.destructed = true;
    this.formbrd.unsubscribe();
    (0, _utils.each)(this.subscribes, function (effect) {
      effect.unsubscribe();
    });
    (0, _utils.each)(this.fields, function (field, key) {
      field.destructor();
      delete _this16.fields[key];
    });
    this.fieldSize = 0;
    delete this.fields;
    delete this.formbrd;
  };

  return Form;
}();

exports.Form = Form;