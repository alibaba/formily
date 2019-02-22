"use strict";

exports.__esModule = true;
exports.createMutators = void 0;

var _utils = require("../utils");

var flatArr = function flatArr(arr) {
  return arr.reduce(function (buf, item) {
    return (0, _utils.isArr)(item) ? buf.concat(flatArr(item)) : buf.concat(item);
  }, []);
};

var createMutators = function createMutators(props) {
  return {
    change: function change(value) {
      props.form.setValue(props.name, value);
    },
    dispatch: function dispatch(name, payload) {
      props.form.triggerEffect(name, {
        name: props.name,
        path: props.path,
        payload: payload
      });
    },
    errors: function errors(_errors) {
      var _props$form;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_props$form = props.form).setErrors.apply(_props$form, [props.name, flatArr((0, _utils.toArr)(_errors))].concat(args));
    },
    push: function push(value) {
      var arr = (0, _utils.toArr)(props.form.getValue(props.name));
      props.form.setValue(props.name, arr.concat(value));
    },
    pop: function pop() {
      var arr = [].concat((0, _utils.toArr)(props.form.getValue(props.name)));
      arr.pop();
      props.form.setValue(props.name, arr);
    },
    insert: function insert(index, value) {
      var arr = [].concat((0, _utils.toArr)(props.form.getValue(props.name)));
      arr.splice(index, 0, value);
      props.form.setValue(props.name, arr);
    },
    remove: function remove(index) {
      var val = props.form.getValue(props.name);

      if ((0, _utils.isNum)(index) && (0, _utils.isArr)(val)) {
        val = [].concat(val);
        val.splice(index, 1);
        props.form.setValue(props.name, val);
      } else {
        props.form.removeValue(props.name);
      }
    },
    unshift: function unshift(value) {
      var arr = [].concat((0, _utils.toArr)(props.form.getValue(props.name)));
      arr.unshift(value);
      props.form.setValue(props.name, arr);
    },
    shift: function shift() {
      var arr = [].concat((0, _utils.toArr)(props.form.getValue(props.name)));
      arr.shift();
      props.form.setValue(props.name, arr);
    },
    move: function move($from, $to) {
      var arr = [].concat((0, _utils.toArr)(props.form.getValue(props.name)));
      var item = arr[$from];
      arr.splice($from, 1);
      arr.splice($to, 0, item);
      props.form.setValue(props.name, arr);
    }
  };
};

exports.createMutators = createMutators;