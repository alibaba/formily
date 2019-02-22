"use strict";

exports.__esModule = true;
exports.FormConsumer = exports.useForm = exports.FormProvider = exports.FormBridge = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _context = require("./context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FormBridge = function FormBridge() {
  return function (Target) {
    var Broadcast = function Broadcast(props) {
      var broadcast = (0, _react.useContext)(_context.BroadcastContext);

      if (!broadcast) {
        return _react.default.createElement(FormProvider, null, function (broadcast) {
          return _react.default.createElement(Target, _extends({}, props, {
            broadcast: broadcast
          }));
        });
      }

      return _react.default.createElement(Target, _extends({}, props, {
        broadcast: broadcast
      }));
    };

    Broadcast.displayName = 'FormBroadcast';
    return Broadcast;
  };
};

exports.FormBridge = FormBridge;

var FormProvider =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FormProvider, _Component);

  function FormProvider() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "broadcast", new _utils.Broadcast());

    return _this;
  }

  var _proto = FormProvider.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.broadcast.unsubscribe();
  };

  _proto.render = function render() {
    var children = this.props.children;
    return _react.default.createElement(_context.BroadcastContext.Provider, {
      value: this.broadcast
    }, (0, _utils.isFn)(children) ? children(this.broadcast) : children);
  };

  return FormProvider;
}(_react.Component);

exports.FormProvider = FormProvider;

_defineProperty(FormProvider, "displayName", 'FormProvider');

var useForm = function useForm() {
  var _useState = (0, _react.useState)({}),
      value = _useState[0],
      setState = _useState[1];

  var broadcast = (0, _react.useContext)(_context.BroadcastContext);
  var initialized = false;
  return (0, _react.useMemo)(function () {
    if (broadcast) {
      broadcast.subscribe(function (_ref) {
        var type = _ref.type,
            state = _ref.state,
            schema = _ref.schema;

        if (type !== 'submit' && type !== 'reset') {
          if (initialized) {
            setState({
              status: type,
              state: state,
              schema: schema
            });
          } else {
            value = {
              status: type,
              state: state,
              schema: schema
            };
          }
        }
      });
      initialized = true;
      var _value = value,
          status = _value.status,
          state = _value.state,
          schema = _value.schema;
      return {
        status: status,
        state: state,
        schema: schema,
        submit: function submit() {
          if (broadcast) {
            broadcast.notify({
              type: 'submit'
            });
          }
        },
        reset: function reset() {
          if (broadcast) {
            broadcast.notify({
              type: 'reset'
            });
          }
        },
        dispatch: function dispatch(name, payload) {
          if (broadcast) {
            broadcast.notify({
              type: 'dispatch',
              name: name,
              payload: payload
            });
          }
        }
      };
    }
  }, [broadcast]);
};

exports.useForm = useForm;

var FormConsumer = function FormConsumer(_ref2) {
  var children = _ref2.children;
  var formApi = useForm();
  if (!formApi) return _react.default.createElement(_react.default.Fragment, null);

  if ((0, _utils.isFn)(children)) {
    return children(formApi);
  } else {
    return children || _react.default.createElement(_react.default.Fragment, null);
  }
};

exports.FormConsumer = FormConsumer;