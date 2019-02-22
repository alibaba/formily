"use strict";

exports.__esModule = true;
exports.connect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var isEvent = function isEvent(candidate) {
  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
};

var isReactNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';

var getSelectedValues = function getSelectedValues(options) {
  var result = [];

  if (options) {
    for (var index = 0; index < options.length; index++) {
      var option = options[index];

      if (option.selected) {
        result.push(option.value);
      }
    }
  }

  return result;
};

var getValue = function getValue(event, isReactNative) {
  if (isEvent(event)) {
    if (!isReactNative && event.nativeEvent && event.nativeEvent.text !== undefined) {
      return event.nativeEvent.text;
    }

    if (isReactNative && event.nativeEvent !== undefined) {
      return event.nativeEvent.text;
    }

    var detypedEvent = event;
    var _detypedEvent$target = detypedEvent.target,
        type = _detypedEvent$target.type,
        value = _detypedEvent$target.value,
        checked = _detypedEvent$target.checked,
        files = _detypedEvent$target.files,
        dataTransfer = detypedEvent.dataTransfer;

    if (type === 'checkbox') {
      return !!checked;
    }

    if (type === 'file') {
      return files || dataTransfer && dataTransfer.files;
    }

    if (type === 'select-multiple') {
      return getSelectedValues(event.target.options);
    }

    return value;
  }

  return event;
};

var createEnum = function createEnum(_enum, enumNames) {
  if ((0, _utils.isArr)(_enum)) {
    return _enum.map(function (item, index) {
      if (typeof item === 'object') {
        return _extends({}, item);
      } else {
        return _extends({}, item, {
          label: (0, _utils.isArr)(enumNames) ? enumNames[index] || item : item,
          value: item
        });
      }
    });
  }

  return [];
};

var bindEffects = function bindEffects(props, effect, dispatch) {
  (0, _utils.each)(effect(dispatch, _extends({}, props)), function (event, key) {
    var prevEvent = key === 'onChange' ? props[key] : undefined;

    props[key] = function () {
      if ((0, _utils.isFn)(prevEvent)) prevEvent.apply(void 0, arguments);
      if ((0, _utils.isFn)(event)) return event.apply(void 0, arguments);
    };
  });
  return props;
};

var connect = function connect(opts) {
  return function (Target) {
    opts = _extends({
      valueName: 'value',
      eventName: 'onChange'
    }, opts);
    return (
      /*#__PURE__*/
      function (_PureComponent) {
        _inheritsLoose(_class, _PureComponent);

        function _class() {
          return _PureComponent.apply(this, arguments) || this;
        }

        var _proto = _class.prototype;

        _proto.render = function render() {
          var _extends2;

          var _this$props = this.props,
              value = _this$props.value,
              name = _this$props.name,
              mutators = _this$props.mutators,
              schema = _this$props.schema,
              editable = _this$props.editable;

          var props = _extends({}, opts.defaultProps, schema['x-props'], (_extends2 = {}, _extends2[opts.valueName] = value, _extends2[opts.eventName] = function (event) {
            var _opts$getValueFromEve;

            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            mutators.change(opts.getValueFromEvent ? (_opts$getValueFromEve = opts.getValueFromEvent).call.apply(_opts$getValueFromEve, [{
              props: schema['x-props'] || {}
            }, event].concat(args)) : getValue(event, isReactNative));
          }, _extends2));

          if (editable !== undefined) {
            if ((0, _utils.isFn)(editable)) {
              if (!editable(name)) {
                props.disabled = true;
              }
            } else if (editable === false) {
              props.disabled = true;
            }
          }

          if ((0, _utils.isFn)(schema['x-effect'])) {
            props = bindEffects(props, schema['x-effect'], mutators.dispatch);
          }

          if ((0, _utils.isFn)(opts.getProps)) {
            var newProps = opts.getProps(props, this.props);

            if (newProps !== undefined) {
              props = newProps;
            }
          }

          if ((0, _utils.isArr)(schema['enum']) && !props.dataSource) {
            props.dataSource = createEnum(schema['enum'], schema['enumNames']);
          }

          return _react.default.createElement((0, _utils.isFn)(opts.getComponent) ? opts.getComponent(Target, props, this.props) : Target, props);
        };

        return _class;
      }(_react.PureComponent)
    );
  };
};

exports.connect = connect;