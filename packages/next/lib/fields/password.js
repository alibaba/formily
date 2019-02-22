"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@uform/react");

var _next = require("@alifd/next");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  .next-input {\n    width: 100%;\n    position: relative;\n    &.input-password input {\n      font-size: 16px;\n      letter-spacing: 2px;\n    }\n    input {\n      padding-right: 25px;\n    }\n    .eye {\n      position: absolute;\n      height: 20px;\n      right: 5px;\n      top: 50%;\n      transform: translate(0, -50%);\n      opacity: 0.3;\n      cursor: pointer;\n      transition: all 0.15s ease-in-out;\n      &:hover {\n        opacity: 0.6;\n      }\n    }\n  }\n  .password-strength-wrapper {\n    background: #e0e0e0;\n    margin-bottom: 3px;\n    position: relative;\n    .div {\n      position: absolute;\n      z-index: 1;\n      height: 8px;\n      top: 0;\n      background: #fff;\n      width: 1px;\n      transform: translate(-50%, 0);\n    }\n    .div-1 {\n      left: 20%;\n    }\n    .div-2 {\n      left: 40%;\n    }\n    .div-3 {\n      left: 60%;\n    }\n    .div-4 {\n      left: 80%;\n    }\n    .password-strength-bar {\n      position: relative;\n      background-image: -webkit-linear-gradient(left, #ff5500, #ff9300);\n      transition: all 0.35s ease-in-out;\n      height: 8px;\n      width: 100%;\n      margin-top: 5px;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var isNum = function isNum(c) {
  return c >= 48 && c <= 57;
};

var isLower = function isLower(c) {
  return c >= 97 && c <= 122;
};

var isUpper = function isUpper(c) {
  return c >= 65 && c <= 90;
};

var isSymbol = function isSymbol(c) {
  return !(isLower(c) || isUpper(c) || isNum(c));
};

var isLetter = function isLetter(c) {
  return isLower(c) || isUpper(c);
};

var getStrength = function getStrength(val) {
  if (!val) return 0;
  var num = 0;
  var lower = 0;
  var upper = 0;
  var symbol = 0;
  var MNS = 0;
  var rep = 0;
  var repC = 0;
  var consecutive = 0;
  var sequential = 0;

  var len = function len() {
    return num + lower + upper + symbol;
  };

  var callme = function callme() {
    var re = num > 0 ? 1 : 0;
    re += lower > 0 ? 1 : 0;
    re += upper > 0 ? 1 : 0;
    re += symbol > 0 ? 1 : 0;

    if (re > 2 && len() >= 8) {
      return re + 1;
    } else {
      return 0;
    }
  };

  for (var i = 0; i < val.length; i++) {
    var c = val.charCodeAt(i);

    if (isNum(c)) {
      num++;

      if (i !== 0 && i !== val.length - 1) {
        MNS++;
      }

      if (i > 0 && isNum(val.charCodeAt(i - 1))) {
        consecutive++;
      }
    } else if (isLower(c)) {
      lower++;

      if (i > 0 && isLower(val.charCodeAt(i - 1))) {
        consecutive++;
      }
    } else if (isUpper(c)) {
      upper++;

      if (i > 0 && isUpper(val.charCodeAt(i - 1))) {
        consecutive++;
      }
    } else {
      symbol++;

      if (i !== 0 && i !== val.length - 1) {
        MNS++;
      }
    }

    var exists = false;

    for (var j = 0; j < val.length; j++) {
      if (val[i] === val[j] && i !== j) {
        exists = true;
        repC += Math.abs(val.length / (j - i));
      }
    }

    if (exists) {
      rep++;
      var unique = val.length - rep;
      repC = unique ? Math.ceil(repC / unique) : Math.ceil(repC);
    }

    if (i > 1) {
      var last1 = val.charCodeAt(i - 1);
      var last2 = val.charCodeAt(i - 2);

      if (isLetter(c)) {
        if (isLetter(last1) && isLetter(last2)) {
          var v = val.toLowerCase();
          var vi = v.charCodeAt(i);
          var vi1 = v.charCodeAt(i - 1);
          var vi2 = v.charCodeAt(i - 2);

          if (vi - vi1 === vi1 - vi2 && Math.abs(vi - vi1) === 1) {
            sequential++;
          }
        }
      } else if (isNum(c)) {
        if (isNum(last1) && isNum(last2)) {
          if (c - last1 === last1 - last2 && Math.abs(c - last1) === 1) {
            sequential++;
          }
        }
      } else {
        if (isSymbol(last1) && isSymbol(last2)) {
          if (c - last1 === last1 - last2 && Math.abs(c - last1) === 1) {
            sequential++;
          }
        }
      }
    }
  }

  var sum = 0;
  var length = len();
  sum += 4 * length;

  if (lower > 0) {
    sum += 2 * (length - lower);
  }

  if (upper > 0) {
    sum += 2 * (length - upper);
  }

  if (num !== length) {
    sum += 4 * num;
  }

  sum += 6 * symbol;
  sum += 2 * MNS;
  sum += 2 * callme();

  if (length === lower + upper) {
    sum -= length;
  }

  if (length === num) {
    sum -= num;
  }

  sum -= repC;
  sum -= 2 * consecutive;
  sum -= 3 * sequential;
  sum = sum < 0 ? 0 : sum;
  sum = sum > 100 ? 100 : sum;

  if (sum >= 80) {
    return 100;
  } else if (sum >= 60) {
    return 80;
  } else if (sum >= 40) {
    return 60;
  } else if (sum >= 20) {
    return 40;
  } else {
    return 20;
  }
};

var Password = (0, _styledComponents.default)((_temp =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Password, _React$Component);

  function Password() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.value || _this.props.defaultValue,
      strength: 0,
      eye: false
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeHandler", function (value) {
      _this.setState({
        value: value,
        strength: getStrength(value)
      }, function () {
        if (_this.props.onChange) {
          _this.props.onChange(value);
        }
      });
    });

    return _this;
  }

  var _proto = Password.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
      this.setState({
        value: this.props.value,
        strength: getStrength(this.props.value)
      });
    }
  };

  _proto.renderStrength = function renderStrength() {
    var strength = this.state.strength;
    return _react.default.createElement("div", {
      className: "password-strength-wrapper"
    }, _react.default.createElement("div", {
      className: "div-1 div"
    }), _react.default.createElement("div", {
      className: "div-2 div"
    }), _react.default.createElement("div", {
      className: "div-3 div"
    }), _react.default.createElement("div", {
      className: "div-4 div"
    }), _react.default.createElement("div", {
      className: "password-strength-bar",
      style: {
        clipPath: "polygon(0 0," + strength + "% 0," + strength + "% 100%,0 100%)"
      }
    }));
  };

  _proto.switchEye = function switchEye() {
    var _this2 = this;

    return function () {
      _this2.setState({
        eye: !_this2.state.eye
      });
    };
  };

  _proto.renderEye = function renderEye() {
    if (!this.state.eye) {
      return _react.default.createElement("img", {
        className: "eye",
        onClick: this.switchEye(),
        src: "//img.alicdn.com/tfs/TB1wyXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"
      });
    } else {
      return _react.default.createElement("img", {
        className: "eye",
        onClick: this.switchEye(),
        src: "//img.alicdn.com/tfs/TB1xiXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        checkStrength = _this$props.checkStrength,
        value = _this$props.value,
        onChange = _this$props.onChange,
        htmlType = _this$props.htmlType,
        innerAfter = _this$props.innerAfter,
        others = _objectWithoutPropertiesLoose(_this$props, ["className", "checkStrength", "value", "onChange", "htmlType", "innerAfter"]);

    return _react.default.createElement("div", {
      className: className
    }, _react.default.createElement(_next.Input, _extends({
      htmlType: this.state.eye ? 'text' : 'password',
      className: "input-" + (this.state.eye ? 'text' : 'password'),
      value: this.state.value,
      onChange: this.onChangeHandler,
      innerAfter: this.renderEye()
    }, others)), checkStrength && this.renderStrength());
  };

  return Password;
}(_react.default.Component), _temp))(_templateObject());
(0, _react2.registerFormField)('password', (0, _react2.connect)()(Password));