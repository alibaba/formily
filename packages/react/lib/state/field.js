"use strict";

exports.__esModule = true;
exports.StateField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _mutators = require("../shared/mutators");

var _context = require("../shared/context");

var _core = require("../shared/core");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StateField = (0, _utils.createHOC)(function (options, Field) {
  var StateField =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(StateField, _Component);

    function StateField(props) {
      var _this;

      _this = _Component.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_this), "renderField", function (key, addReactKey) {
        var path = _this.props.path.concat(key);

        var schemaPath = _this.props.schemaPath.concat(key);

        var name = path.join('.');
        return _react.default.createElement(_core.FormField, {
          key: addReactKey ? name : undefined,
          path: path,
          name: name,
          schemaPath: schemaPath
        });
      });

      _defineProperty(_assertThisInitialized(_this), "getOrderProperties", function () {
        var _this$props = _this.props,
            schema = _this$props.schema,
            path = _this$props.path;
        if (!schema) return [];
        var properties = [];
        (0, _utils.each)(schema.properties, function (item, key) {
          var index = item['x-index'];
          var newPath = path.concat(key);
          var newName = newPath.join('.');

          if (typeof index === 'number') {
            properties[index] = {
              schema: item,
              key: key,
              path: newPath,
              name: newName
            };
          } else {
            properties.push({
              schema: item,
              key: key,
              path: newPath,
              name: newName
            });
          }
        });
        return properties;
      });

      _this.initialized = false;
      _this.state = {};
      _this.field = props.form.registerField(props.name || props.schemaPath.join('.'), {
        rules: _this.getValidateRules(props),
        path: props.schemaPath,
        onChange: _this.onChangeHandler(props),
        editable: _this.getEditable(props),
        props: props.schema
      });
      _this.initialized = true;
      _this.mutators = (0, _mutators.createMutators)(props);
      return _this;
    }

    var _proto = StateField.prototype;

    _proto.getEditable = function getEditable(props) {
      props = props || this.props;

      if (props.schema['x-props'] && props.schema['x-props'].editable !== undefined) {
        return props.schema['x-props'].editable;
      }

      return props.editable;
    };

    _proto.getValidateRules = function getValidateRules(props) {
      props = props || this.props;
      var rules = [];

      if (props && props.schema) {
        rules = (0, _utils.toArr)(props.schema['x-rules']);

        if (props.schema.required) {
          rules.push({
            required: true
          });
        }
      }

      return rules;
    };

    _proto.onChangeHandler = function onChangeHandler() {
      var _this2 = this;

      return function (fieldState) {
        if (_this2.initialized) {
          if (_this2.unmounted) return;

          _this2.setState(fieldState);
        } else {
          _this2.state = fieldState;
        }
      };
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
      this.field.removeValue();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      this.unmounted = false;

      if (!(0, _utils.isEqual)(this.props.schema, prevProps.schema, _utils.filterSchema)) {
        this.field.changeProps(this.props.schema);
      }

      this.field.changeEditable(this.getEditable(this.props));
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          name = _this$props2.name,
          path = _this$props2.path,
          schemaPath = _this$props2.schemaPath,
          renderComponent = _this$props2.renderComponent,
          locale = _this$props2.locale,
          getSchema = _this$props2.getSchema;
      var _this$state = this.state,
          value = _this$state.value,
          visible = _this$state.visible,
          props = _this$state.props,
          errors = _this$state.errors,
          loading = _this$state.loading,
          editable = _this$state.editable,
          required = _this$state.required;
      var newValue = (0, _utils.schemaIs)(props, 'object') ? value || {} : (0, _utils.schemaIs)(props, 'array') ? value || [] : value;
      return visible === false ? _react.default.createElement(_react.default.Fragment, null) : _react.default.createElement(Field, {
        name: name,
        value: newValue,
        errors: errors,
        required: required,
        path: path,
        editable: editable,
        locale: locale,
        loading: loading,
        schemaPath: schemaPath,
        getSchema: getSchema,
        renderField: this.renderField,
        renderComponent: renderComponent,
        getOrderProperties: this.getOrderProperties,
        mutators: this.mutators,
        schema: props
      });
    };

    return StateField;
  }(_react.Component);

  _defineProperty(StateField, "displayName", 'StateField');

  return function (_ref) {
    var name = _ref.name,
        path = _ref.path,
        schemaPath = _ref.schemaPath,
        renderComponent = _ref.renderComponent;

    var _useContext = (0, _react.useContext)(_context.StateContext),
        form = _useContext.form,
        getSchema = _useContext.getSchema,
        locale = _useContext.locale,
        editable = _useContext.editable;

    return _react.default.createElement(StateField, {
      name: name,
      path: path,
      form: form,
      schemaPath: schemaPath,
      getSchema: getSchema,
      locale: locale,
      editable: editable,
      renderComponent: renderComponent,
      schema: getSchema(schemaPath || path)
    });
  };
});
exports.StateField = StateField;