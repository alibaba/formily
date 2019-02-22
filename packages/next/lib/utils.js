"use strict";

exports.__esModule = true;
var _exportNames = {
  acceptEnum: true,
  mapStyledProps: true,
  mapTextComponent: true,
  compose: true,
  moveTo: true
};
exports.moveTo = exports.compose = exports.mapTextComponent = exports.mapStyledProps = exports.acceptEnum = void 0;

var _react = _interopRequireDefault(require("react"));

var _next = require("@alifd/next");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("@uform/utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _utils[key];
});

var _moveto = _interopRequireDefault(require("moveto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 28px;\n  line-height: 28px;\n  vertical-align: middle;\n  font-size: 13px;\n  color: #333;\n  &.small {\n    height: 20px;\n    line-height: 20px;\n  }\n  &.large {\n    height: 40px;\n    line-height: 40px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

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
})(_templateObject());

var acceptEnum = function acceptEnum(component) {
  return function (_ref2) {
    var dataSource = _ref2.dataSource,
        others = _objectWithoutPropertiesLoose(_ref2, ["dataSource"]);

    if (dataSource) {
      return _react.default.createElement(_next.Select, _extends({
        dataSource: dataSource
      }, others));
    } else {
      return _react.default.createElement(component, others);
    }
  };
};

exports.acceptEnum = acceptEnum;

var mapStyledProps = function mapStyledProps(props, _ref3) {
  var loading = _ref3.loading,
      size = _ref3.size;

  if (loading) {
    props.state = props.state || 'loading';
  }

  if (size) {
    props.size = size;
  }
};

exports.mapStyledProps = mapStyledProps;

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