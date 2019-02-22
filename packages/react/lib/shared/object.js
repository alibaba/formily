"use strict";

var _react = _interopRequireDefault(require("react"));

var _core = require("./core");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

(0, _core.registerFormField)('object',
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ObjectField, _React$Component);

  function ObjectField() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ObjectField.prototype;

  _proto.renderProperties = function renderProperties() {
    var _this$props = this.props,
        renderField = _this$props.renderField,
        getOrderProperties = _this$props.getOrderProperties;
    var properties = getOrderProperties(this.props);
    var children = [];
    (0, _utils.each)(properties, function (_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          key = _ref.key;

      key && children.push(renderField(key, true));
    });
    return children;
  };

  _proto.render = function render() {
    return this.renderProperties();
  };

  return ObjectField;
}(_react.default.Component));