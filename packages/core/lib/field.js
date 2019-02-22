"use strict";

exports.__esModule = true;
exports.Field = void 0;

var _utils = require("./utils");

var _immer = _interopRequireWildcard(require("immer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var filterSchema = function filterSchema(_, key) {
  return key !== 'properties' && key !== 'items';
};

(0, _immer.setAutoFreeze)(false);

var isValid = function isValid(val) {
  return val !== undefined;
};

var Field =
/*#__PURE__*/
function () {
  function Field(context, options) {
    this.fieldbrd = new _utils.Broadcast();
    this.context = context;
    this.dirty = false;
    this.pristine = true;
    this.valid = true;
    this.invalid = false;
    this.visible = true;
    this.destructed = false;
    this.loading = false;
    this.errors = [];
    this.effectErrors = [];
    this.initialized = false;
    this.initialize(options);
    this.initialized = true;
  }

  var _proto = Field.prototype;

  _proto.initialize = function initialize(options) {
    if (this.initialized) {
      this.value = options.value;

      if (isValid(options.initialValue)) {
        this.initialValue = (0, _utils.clone)(options.initialValue);
      }
    } else {
      this.value = options.value;
      this.initialValue = options.initialValue;
    }

    this.name = isValid(options.name) ? options.name : this.name;
    this.namePath = (0, _utils.resolveFieldPath)(this.name);
    this.editable = this.getEditable(options.editable);
    this.path = (0, _utils.resolveFieldPath)(isValid(options.path) ? options.path : this.path);
    this.rules = isValid(options.rules) ? (0, _utils.clone)(options.rules) : this.rules;
    this.required = (0, _utils.hasRequired)(this.rules);
    this.props = (0, _utils.clone)(isValid(options.props) ? options.props : this.props, filterSchema);

    if ((0, _utils.isFn)(options.onChange)) {
      this.onChange(options.onChange);
    }
  };

  _proto.getEditable = function getEditable(editable) {
    if ((0, _utils.isFn)(editable)) return editable(this.name);
    return editable;
  };

  _proto.onChange = function onChange(fn) {
    if ((0, _utils.isFn)(fn)) {
      if (this.unSubscribeOnChange) this.unSubscribeOnChange();
      fn(this.publishState());
      this.unSubscribeOnChange = this.subscribe(fn);
    }
  };

  _proto.pathEqual = function pathEqual(path) {
    if ((0, _utils.isStr)(path)) {
      if (path === this.name) return true;
    }

    path = (0, _utils.resolveFieldPath)(path);

    if (path.length === this.path.length) {
      for (var i = 0; i < path.length; i++) {
        if (path[i] !== this.path[i]) return false;
      }

      return true;
    } else if (path.length === this.namePath.length) {
      for (var _i = 0; _i < path.length; _i++) {
        if (path[_i] !== this.namePath[_i]) return false;
      }

      return true;
    }

    return false;
  };

  _proto.publishState = function publishState() {
    return (0, _utils.publishFieldState)(this);
  };

  _proto.subscribe = function subscribe(callback) {
    return this.fieldbrd.subscribe(callback);
  };

  _proto.notify = function notify(force) {
    if (!this.dirty && !force) return;
    this.fieldbrd.notify(this.publishState());
    this.dirty = false;
    this.dirtyType = '';
  };

  _proto.unsubscribe = function unsubscribe() {
    this.fieldbrd.unsubscribe();
  };

  _proto.changeEditable = function changeEditable(editable) {
    editable = this.getEditable(editable);

    if (editable !== undefined && this.editable !== editable) {
      this.editable = editable;
      this.dirty = true;
      this.notify();
    }
  };

  _proto.changeRules = function changeRules(rules) {
    var lastRules = this.rules;

    if (!(0, _utils.isEqual)(lastRules, rules)) {
      this.rules = (0, _utils.clone)(rules);
      this.dirty = true;
      this.notify();
    }
  };

  _proto.changeProps = function changeProps(props, force) {
    var lastProps = this.props;

    if (force || !(0, _utils.isEqual)(lastProps, props, filterSchema)) {
      this.props = (0, _utils.clone)(props, filterSchema);
      this.dirty = true;
      this.notify();
    }
  };

  _proto.changeValue = function changeValue(value) {
    this.context.setValue(this.name, value);
  };

  _proto.setInitalValue = function setInitalValue() {
    var lastValue = this.context.getValue(this.name);

    if (this.initialValue !== undefined && !(0, _utils.isEqual)(lastValue, this.initialValue)) {
      var initialValue = (0, _utils.clone)(this.initialValue);
      this.context.setIn(this.name, initialValue);
      this.value = initialValue;
    }
  };

  _proto.removeValue = function removeValue() {
    this.value = undefined;
    if (!this.context) return;
    this.context.deleteIn(this.name);

    if (typeof this.value === 'object') {
      this.context.updateChildrenVisible(this, false);
    }
  };

  _proto.resetValue = function resetValue() {
    if (this.initialValue !== undefined) {
      var lastValue = this.value;

      if (!(0, _utils.isEqual)(lastValue, this.initialValue)) {
        this.value = (0, _utils.clone)(this.initialValue);
        this.context.setIn(this.name, this.value);
        this.dirty = true;
      }
    }
  };

  _proto.checkState = function checkState(published) {
    if (published === void 0) {
      published = this.publishState();
    }

    if (!(0, _utils.isEqual)(published.value, this.value)) {
      this.value = published.value;
      this.pristine = false;
      this.context.setIn(this.name, this.value);
      this.context.updateChildrenValue(this);
      this.dirtyType = 'value';
      this.dirty = true;
    }

    if (!(0, _utils.isEqual)(published.initialValue, this.initialValue)) {
      this.initialValue = published.initialValue;
      this.context.setInitialValueIn(this.name, this.value);
      this.context.updateChildrenInitalValue(this);
      this.dirtyType = 'initialValue';
      this.dirty = true;
    }

    var editable = this.getEditable(published.editable);

    if (!(0, _utils.isEqual)(editable, this.editable)) {
      this.editable = editable;
      this.dirtyType = 'editable';
      this.dirty = true;
    }

    published.errors = (0, _utils.toArr)(published.errors).filter(function (v) {
      return !!v;
    });

    if (!(0, _utils.isEqual)(published.errors, this.effectErrors)) {
      this.effectErrors = published.errors;
      this.valid = this.effectErrors.length > 0 && this.errors.length > 0;
      this.invalid = !this.valid;
      this.dirtyType = 'errors';
      this.dirty = true;
    }

    if (!(0, _utils.isEqual)(published.rules, this.rules)) {
      this.rules = published.rules;
      this.errors = [];
      this.valid = true;
      this.invalid = false;
      this.dirtyType = 'rules';
      this.dirty = true;
    }

    if (!(0, _utils.isEqual)(published.required, this.required)) {
      this.required = published.required;

      if (this.required) {
        if (!(0, _utils.hasRequired)(this.rules)) {
          this.rules = (0, _utils.toArr)(this.rules).concat({
            required: true
          });
        }
      } else {
        this.rules = (0, _utils.toArr)(this.rules).filter(function (rule) {
          if (rule && rule.required) return false;
          return true;
        });
      }

      this.dirty = true;
    }

    if (published.loading !== this.loading) {
      this.loading = published.loading;
      this.dirtyType = 'loading';
      this.dirty = true;
    }

    if (!(0, _utils.isEqual)(published.visible, this.visible)) {
      this.visible = published.visible;

      if (this.visible) {
        this.value = this.value !== undefined ? this.value : (0, _utils.clone)(this.initialValue);
        if (this.value !== undefined) this.context.setIn(this.name, this.value);
        this.context.updateChildrenVisible(this, true);
      } else {
        this.context.deleteIn(this.name);
        this.context.updateChildrenVisible(this, false);
      }

      this.dirtyType = 'visible';
      this.dirty = true;
    }

    if (!(0, _utils.isEqual)(published.props, this.props, filterSchema)) {
      this.props = (0, _utils.clone)(published.props, filterSchema);
      this.dirtyType = 'props';
      this.dirty = true;
    }
  };

  _proto.updateState = function updateState(reducer) {
    if (!(0, _utils.isFn)(reducer)) return;
    var published = (0, _immer.default)({
      name: this.name,
      path: this.path,
      props: (0, _utils.clone)(this.props, filterSchema),
      value: (0, _utils.clone)(this.value),
      initialValue: (0, _utils.clone)(this.initialValue),
      valid: this.valid,
      loading: this.loading,
      invalid: this.invalid,
      pristine: this.pristine,
      rules: (0, _utils.clone)(this.rules),
      errors: (0, _utils.clone)(this.effectErrors),
      visible: this.visible,
      required: this.required
    }, reducer);
    this.checkState(published);
  };

  _proto.destructor = function destructor() {
    if (this.destructed) return;
    this.destructed = true;

    if (this.value !== undefined) {
      this.value = undefined;
      this.context.deleteIn(this.name);
    }

    this.context.updateChildrenVisible(this, false);
    delete this.context;
    this.unsubscribe();
    delete this.fieldbrd;
  };

  return Field;
}();

exports.Field = Field;