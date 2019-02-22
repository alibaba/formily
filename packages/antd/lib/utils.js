"use strict";

exports.__esModule = true;
var _exportNames = {
  StateLoading: true,
  acceptEnum: true,
  mapLoadingProps: true,
  mapTextComponent: true,
  compose: true,
  transformDataSourceKey: true,
  moveTo: true
};
exports.moveTo = exports.transformDataSourceKey = exports.compose = exports.mapTextComponent = exports.mapLoadingProps = exports.acceptEnum = exports.StateLoading = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _moveto = _interopRequireDefault(require("moveto"));

var _utils = require("@uform/utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _utils[key];
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 32px;\n  line-height: 32px;\n  vertical-align: middle;\n  font-size: 13px;\n  color: #333;\n  &.small {\n    height: 24px;\n    line-height: 24px;\n  }\n  &.large {\n    height: 40px;\n    line-height: 40px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  min-width: 200px;\n  max-width: 300px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var WrapSelect = (0, _styledComponents.default)(
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(_class, _React$Component);

  function _class() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = _class.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$dataSourc = _this$props.dataSource,
        dataSource = _this$props$dataSourc === void 0 ? [] : _this$props$dataSourc,
        others = _objectWithoutPropertiesLoose(_this$props, ["dataSource"]);

    var children = dataSource.map(function (item) {
      var label = item.label,
          value = item.value,
          others = _objectWithoutPropertiesLoose(item, ["label", "value"]);

      return _react.default.createElement(_antd.Select.Option, _extends({
        key: value
      }, others, {
        label: label,
        value: value
      }), label);
    });
    return _react.default.createElement(_antd.Select, _extends({
      className: this.props.className
    }, others), children);
  };

  return _class;
}(_react.default.Component))(_templateObject());
var Text = (0, _styledComponents.default)(function (props) {
  var value;

  if (props.dataSource && props.dataSource.length) {
    var find = props.dataSource.filter(function (_ref) {
      var value = _ref.value;
      return Array.isArray(props.value) ? props.value.indexOf(value) > -1 : props.value === value;
    });
    value = find.map(function (item) {
      return item.label;
    }).join(' , ');
  } else {
    value = Array.isArray(props.value) ? props.value.join(' ~ ') : String(props.value || '');
  }

  return _react.default.createElement("div", {
    className: props.className + " " + (props.size || '') + " text-field"
  }, value || 'N/A');
})(_templateObject2());

var StateLoading = function StateLoading(Target) {
  return (
    /*#__PURE__*/
    function (_React$Component2) {
      _inheritsLoose(Select, _React$Component2);

      function Select() {
        return _React$Component2.apply(this, arguments) || this;
      }

      var _proto2 = Select.prototype;

      _proto2.componentDidMount = function componentDidMount() {
        if (this.wrapper) {
          this.wrapperDOM = _reactDom.default.findDOMNode(this.wrapper);
          this.mapState();
        }
      };

      _proto2.componentDidUpdate = function componentDidUpdate() {
        this.mapState();
      };

      _proto2.mapState = function mapState() {
        var _this = this;

        var state = this.props.state;
        var loadingName = 'anticon-spin';
        var iconSizeClassNames = ['xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl'];
        this.classList = this.classList || [];

        if (this.wrapperDOM) {
          var icon = this.wrapperDOM.querySelector('.anticon');
          if (!icon || !icon.classList) return;

          if (state === 'loading') {
            icon.classList.forEach(function (className) {
              if (className.indexOf('anticon-') > -1) {
                if (className !== loadingName && iconSizeClassNames.every(function (val) {
                  return "anticon-" + val !== className;
                })) {
                  icon.classList.remove(className);

                  _this.classList.push(className);
                }
              }
            });

            if (!icon.classList.contains(loadingName)) {
              icon.classList.add(loadingName);
            }
          } else {
            icon.classList.remove(loadingName);
            this.classList.forEach(function (className) {
              icon.classList.add(className);
            });
            this.classList = [];
          }
        }
      };

      _proto2.render = function render() {
        var _this2 = this;

        return _react.default.createElement(Target, _extends({
          ref: function ref(inst) {
            if (inst) {
              _this2.wrapper = inst;
            }
          }
        }, this.props));
      };

      return Select;
    }(_react.default.Component)
  );
};

exports.StateLoading = StateLoading;
var Select = StateLoading(WrapSelect);

var acceptEnum = function acceptEnum(component) {
  return function (_ref2) {
    var dataSource = _ref2.dataSource,
        others = _objectWithoutPropertiesLoose(_ref2, ["dataSource"]);

    if (dataSource || others.showSearch) {
      return _react.default.createElement(Select, _extends({
        dataSource: dataSource
      }, others));
    } else {
      return _react.default.createElement(component, others);
    }
  };
};

exports.acceptEnum = acceptEnum;

var mapLoadingProps = function mapLoadingProps(props, _ref3) {
  var loading = _ref3.loading,
      size = _ref3.size;

  if (loading) {
    props.state = props.state || 'loading';
    props.loading = !!props.state;
  }

  if (size) {
    props.size = size;
  }
};

exports.mapLoadingProps = mapLoadingProps;

var mapTextComponent = function mapTextComponent(Target, props, _ref4) {
  var editable = _ref4.editable,
      name = _ref4.name;

  if (editable !== undefined) {
    if ((0, _utils.isFn)(editable)) {
      if (!editable(name)) {
        return Text;
      }
    } else if (editable === false) {
      return Text;
    }
  }

  return Target;
};

exports.mapTextComponent = mapTextComponent;

var compose = function compose() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (payload) {
    for (var _len2 = arguments.length, extra = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      extra[_key2 - 1] = arguments[_key2];
    }

    return args.reduce(function (buf, fn) {
      return buf !== undefined ? fn.apply(void 0, [buf].concat(extra)) : fn.apply(void 0, [payload].concat(extra));
    }, payload);
  };
};

exports.compose = compose;

var transformDataSourceKey = function transformDataSourceKey(component, dataSourceKey) {
  return function (_ref5) {
    var _extends2;

    var dataSource = _ref5.dataSource,
        others = _objectWithoutPropertiesLoose(_ref5, ["dataSource"]);

    return _react.default.createElement(component, _extends((_extends2 = {}, _extends2[dataSourceKey] = dataSource, _extends2), others));
  };
};

exports.transformDataSourceKey = transformDataSourceKey;

var moveTo = function moveTo(element) {
  if (!element) return;

  if (element.scrollIntoView) {
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'start'
    });
  } else {
    new _moveto.default().move(element.getBoundingClientRect().top);
  }
};

exports.moveTo = moveTo;