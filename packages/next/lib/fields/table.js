"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@uform/react");

var _utils = require("@uform/utils");

var _next = require("@alifd/next");

var _array = require("./array");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n    display: inline-block;\n    .array-item-addition {\n      padding: 10px 20px;\n      background: #fbfbfb;\n      border-left: 1px solid #dcdee3;\n      border-right: 1px solid #dcdee3;\n      border-bottom: 1px solid #dcdee3;\n      .next-btn-text {\n        color: #888;\n      }\n    }\n    .array-item-operator {\n      display: flex;\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  .next-table {\n    position: relative;\n  }\n\n  .next-table,\n  .next-table *,\n  .next-table :after,\n  .next-table :before {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  .next-table table {\n    border-collapse: collapse;\n    border-spacing: 0;\n    width: 100%;\n    background: #fff;\n    display: table !important;\n    margin: 0 !important;\n  }\n\n  .next-table table tr:first-child td {\n    border-top-width: 0;\n  }\n\n  .next-table th {\n    padding: 0;\n    background: #ebecf0;\n    color: #333;\n    text-align: left;\n    font-weight: 400;\n    min-width: 200px;\n    border: 1px solid #dcdee3;\n  }\n\n  .next-table th .next-table-cell-wrapper {\n    padding: 12px 16px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    word-break: break-all;\n  }\n\n  .next-table td {\n    padding: 0;\n    border: 1px solid #dcdee3;\n  }\n\n  .next-table td .next-table-cell-wrapper {\n    padding: 12px 16px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    word-break: break-all;\n    display: flex;\n  }\n\n  .next-table.zebra tr:nth-child(odd) td {\n    background: #fff;\n  }\n\n  .next-table.zebra tr:nth-child(2n) td {\n    background: #f7f8fa;\n  }\n\n  .next-table-empty {\n    color: #a0a2ad;\n    padding: 32px 0;\n    text-align: center;\n  }\n\n  .next-table-row {\n    -webkit-transition: all 0.3s ease;\n    transition: all 0.3s ease;\n    background: #fff;\n    color: #333;\n    border: none !important;\n  }\n\n  .next-table-row.hidden {\n    display: none;\n  }\n\n  .next-table-row.hovered,\n  .next-table-row.selected {\n    background: #f2f3f7;\n    color: #333;\n  }\n\n  .next-table-body,\n  .next-table-header {\n    overflow: auto;\n    font-size: 12px;\n  }\n\n  .next-table-body {\n    font-size: 12px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

/**
 * 轻量级Table，用next table实在太重了
 **/
var Table = (0, _styledComponents.default)(
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Table, _Component);

  function Table() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Table.prototype;

  _proto.renderCell = function renderCell(_ref) {
    var record = _ref.record,
        col = _ref.col,
        rowIndex = _ref.rowIndex,
        colIndex = _ref.colIndex;
    return _react.default.createElement("div", {
      className: "next-table-cell-wrapper"
    }, (0, _utils.isFn)(col.cell) ? col.cell(record ? record[col.dataIndex] : undefined, rowIndex, record) : record ? record[col.dataIndex] : undefined);
  };

  _proto.renderTable = function renderTable(columns, dataSource) {
    var _this = this;

    return _react.default.createElement("div", {
      className: "next-table-body"
    }, _react.default.createElement("table", null, _react.default.createElement("colgroup", null, columns.map(function (col, index) {
      return _react.default.createElement("col", {
        key: index,
        style: {
          width: col.width
        }
      });
    })), _react.default.createElement("thead", null, _react.default.createElement("tr", null, columns.map(function (col, index) {
      return _react.default.createElement("th", {
        key: index,
        className: "next-table-header-node"
      }, _react.default.createElement("div", {
        className: "next-table-cell-wrapper"
      }, col.title));
    }))), _react.default.createElement("tbody", null, dataSource.map(function (record, rowIndex) {
      return _react.default.createElement("tr", {
        key: rowIndex,
        className: "next-table-row"
      }, columns.map(function (col, colIndex) {
        return _react.default.createElement("td", {
          key: colIndex,
          className: "next-table-cell"
        }, _this.renderCell({
          record: record,
          col: col,
          rowIndex: rowIndex,
          colIndex: colIndex
        }));
      }));
    }), this.renderPlacehodler(dataSource, columns))));
  };

  _proto.renderPlacehodler = function renderPlacehodler(dataSource, columns) {
    if (dataSource.length === 0) {
      return _react.default.createElement("tr", {
        className: "next-table-row"
      }, _react.default.createElement("td", {
        className: "next-table-cell",
        colSpan: columns.length
      }, _react.default.createElement("div", {
        className: "next-table-empty",
        style: {
          padding: 10
        }
      }, _react.default.createElement("img", {
        src: "//img.alicdn.com/tfs/TB1y2nwp_tYBeNjy1XdXXXXyVXa-200-200.png",
        style: {
          height: 60
        }
      }))));
    }
  };

  _proto.getColumns = function getColumns(children) {
    var columns = [];

    _react.default.Children.forEach(children, function (child) {
      if (_react.default.isValidElement(child)) {
        if (child.type === Column || child.type.displayName === '@schema-table-column') {
          columns.push(child.props);
        }
      }
    });

    return columns;
  };

  _proto.render = function render() {
    var columns = this.getColumns(this.props.children);
    var dataSource = (0, _utils.toArr)(this.props.dataSource);
    return _react.default.createElement("div", {
      className: this.props.className
    }, _react.default.createElement("div", {
      className: "next-table zebra"
    }, _react.default.createElement("div", {
      className: "next-table-inner"
    }, this.renderTable(columns, dataSource))));
  };

  return Table;
}(_react.Component))(_templateObject());

var Column =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(Column, _Component2);

  function Column() {
    return _Component2.apply(this, arguments) || this;
  }

  var _proto2 = Column.prototype;

  _proto2.render = function render() {
    return this.props.children;
  };

  return Column;
}(_react.Component);

_defineProperty(Column, "displayName", '@schema-table-column');

(0, _react2.registerFormField)('table', (0, _styledComponents.default)(
/*#__PURE__*/
function (_ArrayField) {
  _inheritsLoose(_class, _ArrayField);

  function _class() {
    return _ArrayField.apply(this, arguments) || this;
  }

  var _proto3 = _class.prototype;

  _proto3.createFilter = function createFilter(key, payload) {
    var schema = this.props.schema;
    var columnFilter = schema['x-props'] && schema['x-props'].columnFilter;
    return function (render, otherwise) {
      if ((0, _utils.isFn)(columnFilter)) {
        return columnFilter(key, payload) ? (0, _utils.isFn)(render) ? render() : render : (0, _utils.isFn)(otherwise) ? otherwise() : otherwise;
      } else {
        return render();
      }
    };
  };

  _proto3.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        value = _this$props.value,
        schema = _this$props.schema,
        locale = _this$props.locale,
        className = _this$props.className,
        renderField = _this$props.renderField;
    var style = schema['x-props'] && schema['x-props'].style;
    var additionFilter = this.createFilter('addition', schema);
    return _react.default.createElement("div", {
      className: className,
      style: style,
      onClick: this.onClearErrorHandler()
    }, _react.default.createElement("div", null, _react.default.createElement(Table, {
      dataSource: value
    }, Object.keys(schema.items && schema.items.properties || {}).reduce(function (buf, key) {
      var itemSchema = schema.items.properties[key];

      var filter = _this2.createFilter(key, itemSchema);

      var res = filter(function () {
        return buf.concat(_react.default.createElement(Column, _extends({}, itemSchema, {
          key: key,
          title: itemSchema.title,
          dataIndex: key,
          cell: function cell(record, index) {
            return renderField([index, key]);
          }
        })));
      }, function () {
        return buf;
      });
      return res;
    }, []), additionFilter(function () {
      return _react.default.createElement(Column, {
        key: "operations",
        title: locale.operations,
        dataIndex: "operations",
        width: 180,
        cell: function cell(item, index) {
          return _react.default.createElement("div", {
            className: "array-item-operator"
          }, _this2.controllable(index + ".remove", item) && _react.default.createElement(_array.CircleButton, {
            onClick: _this2.onRemoveHandler(index)
          }, _react.default.createElement(_next.Icon, {
            size: "xs",
            type: "ashbin"
          })), value.length > 1 && _this2.controllable(index + ".moveDown", item) && _react.default.createElement(_array.CircleButton, {
            onClick: _this2.onMoveHandler(index, index + 1 > value.length - 1 ? 0 : index + 1)
          }, _react.default.createElement(_next.Icon, {
            size: "xs",
            type: "arrow-down"
          })), value.length > 1 && _this2.controllable(index + ".moveUp", item) && _react.default.createElement(_array.CircleButton, {
            onClick: _this2.onMoveHandler(index, index - 1 < 0 ? value.length - 1 : index - 1)
          }, _react.default.createElement(_next.Icon, {
            size: "xs",
            type: "arrow-up"
          })));
        }
      });
    })), this.controllable('addition', value) && this.renderAddition()));
  };

  return _class;
}(_array.ArrayField))(_templateObject2()));