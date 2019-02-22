"use strict";

exports.__esModule = true;
exports.StateForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _core = require("@uform/core");

var _context = require("../shared/context");

var _core2 = require("../shared/core");

var _reactEva = require("react-eva");

var _broadcast = require("../shared/broadcast");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StateForm = (0, _utils.createHOC)(function (options, Form) {
  var StateForm =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(StateForm, _Component);

    function StateForm(props) {
      var _this;

      _this = _Component.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_this), "getSchema", function (path) {
        var schema = _this.props.schema;
        var result = (0, _utils.getSchemaNodeFromPath)(schema, path);
        var transformer = result && (0, _core2.getFormFieldPropsTransformer)(result['x-component'] || result['type']);
        return transformer ? transformer(result) : result;
      });

      _defineProperty(_assertThisInitialized(_this), "onNativeSubmitHandler", function (e) {
        if (e.preventDefault) {
          e.stopPropagation();
          e.preventDefault();
        }

        _this.form.submit();
      });

      _defineProperty(_assertThisInitialized(_this), "getValues", function () {
        return _this.form.getValue();
      });

      _defineProperty(_assertThisInitialized(_this), "submit", function () {
        _this.form.submit();
      });

      _defineProperty(_assertThisInitialized(_this), "reset", function () {
        _this.form.reset();
      });

      _defineProperty(_assertThisInitialized(_this), "validate", function () {
        return _this.form.validate();
      });

      _this.initialized = false;
      _this.form = (0, _core.createForm)({
        initialValues: props.defaultValue || props.initialValues,
        effects: props.effects,
        subscribes: props.subscribes,
        schema: props.schema,
        onSubmit: _this.onSubmitHandler(props),
        onFormChange: _this.onFormChangeHandler(props),
        onFieldChange: _this.onFieldChangeHandler(props),
        onValidateFailed: props.onValidateFailed,
        onReset: _this.onResetHandler(props),
        onFormWillInit: function onFormWillInit(form) {
          props.implementActions({
            setFormState: form.setFormState,
            getFormState: form.getFormState,
            setFieldState: form.setFieldState,
            getFieldState: form.getFieldState,
            reset: _this.reset,
            submit: _this.submit,
            validate: _this.validate,
            getSchema: _this.getSchema
          });
        }
      });
      _this.state = {};
      _this.initialized = true;
      return _this;
    }

    var _proto = StateForm.prototype;

    _proto.notify = function notify(payload) {
      var _this$props = this.props,
          broadcast = _this$props.broadcast,
          schema = _this$props.schema;

      if (broadcast) {
        payload.schema = schema;
        broadcast.notify(payload);
      }
    };

    _proto.onFormChangeHandler = function onFormChangeHandler(props) {
      var _this2 = this;

      var lastState = this.state;
      return function (_ref) {
        var formState = _ref.formState;
        if (_this2.unmounted) return;

        if (lastState && lastState.pristine !== formState.pristine) {
          if (lastState.pristine) {
            _this2.notify({
              type: 'changed',
              state: formState
            });
          } else {
            _this2.notify({
              type: 'reseted',
              state: formState
            });
          }
        }

        lastState = formState;

        if (_this2.initialized) {
          if (formState.dirty) {
            clearTimeout(_this2.timerId);
            _this2.timerId = setTimeout(function () {
              clearTimeout(_this2.timerId);

              _this2.setState(formState);
            }, 60);
          }
        } else {
          _this2.state = formState;

          _this2.notify({
            type: 'initialize',
            state: formState
          });
        }
      };
    };

    _proto.onFieldChangeHandler = function onFieldChangeHandler(props) {
      var _this3 = this;

      return function (_ref2) {
        var formState = _ref2.formState;

        if (props.onChange) {
          var values = formState.values;

          if (!(0, _utils.isEqual)(_this3.lastFormValues, values)) {
            props.onChange(values);
            _this3.lastFormValues = (0, _utils.clone)(values);
          }
        }
      };
    };

    _proto.onSubmitHandler = function onSubmitHandler(props) {
      var _this4 = this;

      return function (_ref3) {
        var formState = _ref3.formState;

        if (props.onSubmit) {
          var promise = props.onSubmit((0, _utils.clone)(formState.values));

          if (promise && promise.then) {
            _this4.notify({
              type: 'submitting',
              state: _this4.state
            });

            promise.then(function () {
              _this4.notify({
                type: 'submitted',
                state: _this4.state
              });
            });
          }
        }
      };
    };

    _proto.onResetHandler = function onResetHandler(props) {
      return function (_ref4) {
        var formState = _ref4.formState;

        if (props.onReset) {
          props.onReset((0, _utils.clone)(formState.values));
        }
      };
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      return !(0, _utils.isEqual)(nextProps, this.props);
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (this.props.value && !(0, _utils.isEqual)(this.props.value, prevProps.value)) {
        this.form.changeValues(this.props.value);
      }

      if (this.props.initialValues && !(0, _utils.isEqual)(this.props.initialValues, prevProps.initialValues)) {
        this.form.initialize(this.props.initialValues);
      }
    };

    _proto.componentDidMount = function componentDidMount() {
      var _this5 = this;

      this.unmounted = false;
      this.form.triggerEffect('onFormMount', this.form.publishState());
      this.unsubscribe = this.props.broadcast.subscribe(function (_ref5) {
        var type = _ref5.type,
            name = _ref5.name,
            payload = _ref5.payload;

        if (type === 'submit') {
          _this5.submit();
        } else if (type === 'reset') {
          _this5.reset();
        } else if (type === 'dispatch') {
          _this5.form.triggerEffect(name, payload);
        }
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;

      if (this.form) {
        this.form.destructor();
        this.unsubscribe();
        delete this.form;
      }
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          onSubmit = _this$props2.onSubmit,
          onChange = _this$props2.onChange,
          onReset = _this$props2.onReset,
          onValidateFailed = _this$props2.onValidateFailed,
          initialValues = _this$props2.initialValues,
          defaultValue = _this$props2.defaultValue,
          actions = _this$props2.actions,
          effects = _this$props2.effects,
          implementActions = _this$props2.implementActions,
          dispatch = _this$props2.dispatch,
          editable = _this$props2.editable,
          createEvents = _this$props2.createEvents,
          subscribes = _this$props2.subscribes,
          subscription = _this$props2.subscription,
          children = _this$props2.children,
          schema = _this$props2.schema,
          broadcast = _this$props2.broadcast,
          locale = _this$props2.locale,
          value = _this$props2.value,
          others = _objectWithoutPropertiesLoose(_this$props2, ["onSubmit", "onChange", "onReset", "onValidateFailed", "initialValues", "defaultValue", "actions", "effects", "implementActions", "dispatch", "editable", "createEvents", "subscribes", "subscription", "children", "schema", "broadcast", "locale", "value"]);

      return _react.default.createElement(_context.StateContext.Provider, {
        value: {
          form: this.form,
          getSchema: this.getSchema,
          locale: locale,
          editable: editable,
          broadcast: this.broadcast
        }
      }, _react.default.createElement(Form, _extends({}, others, {
        onSubmit: this.onNativeSubmitHandler
      }), children));
    };

    return StateForm;
  }(_react.Component);

  _defineProperty(StateForm, "displayName", 'StateForm');

  _defineProperty(StateForm, "defaultProps", {
    locale: {}
  });

  return (0, _reactEva.connect)({
    autoRun: false
  })((0, _broadcast.FormBridge)()(StateForm));
});
exports.StateForm = StateForm;