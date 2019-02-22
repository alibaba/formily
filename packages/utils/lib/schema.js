"use strict";

exports.__esModule = true;
exports.caculateSchemaInitialValues = exports.registerVirtualbox = exports.isVirtualBox = exports.schemaIs = exports.getSchemaNodeFromPath = void 0;

var _array = require("./array");

var _accessor = require("./accessor");

var _types = require("./types");

var _isEmpty = require("./isEmpty");

var numberRE = /^\d+$/;
var VIRTUAL_BOXES = {};

var getSchemaNodeFromPath = function getSchemaNodeFromPath(schema, path) {
  var res = schema;
  var suc = 0;

  for (var i = 0; i < path.length; i++) {
    var key = path[i];

    if (res && res.properties) {
      res = res.properties[key];
      suc++;
    } else if (res && res.items && numberRE.test(key)) {
      res = res.items;
      suc++;
    }
  }

  return suc === path.length ? res : undefined;
};

exports.getSchemaNodeFromPath = getSchemaNodeFromPath;

var schemaIs = function schemaIs(schema, type) {
  return schema && schema.type === type;
};

exports.schemaIs = schemaIs;

var isVirtualBox = function isVirtualBox(name) {
  return !!VIRTUAL_BOXES[name];
};

exports.isVirtualBox = isVirtualBox;

var registerVirtualbox = function registerVirtualbox(name) {
  VIRTUAL_BOXES[name] = true;
};

exports.registerVirtualbox = registerVirtualbox;

var schemaTraverse = function schemaTraverse(schema, callback, path, schemaPath) {
  if (path === void 0) {
    path = [];
  }

  if (schemaPath === void 0) {
    schemaPath = [];
  }

  if (schema) {
    if (isVirtualBox(schema['type']) || isVirtualBox(schema['x-component'])) {
      path = path.slice(0, path.length - 1);
    }

    callback(schema, {
      path: path,
      schemaPath: schemaPath
    });

    if (schemaIs(schema, 'object') || schema.properties) {
      (0, _array.each)(schema.properties, function (schema, key) {
        schemaTraverse(schema, callback, path.concat(key), schemaPath.concat(key));
      });
    } else if (schemaIs(schema, 'array') || schema.items) {
      if (schema.items) {
        callback(schema.items, function (index) {
          schemaTraverse(schema.items, callback, path.concat(index), schemaPath.concat(index));
        }, path);
      }
    }
  }
};

var caculateSchemaInitialValues = function caculateSchemaInitialValues(schema, initialValues, callback) {
  initialValues = initialValues || schema.default || {};
  schemaTraverse(schema, function (schema, $path, parentPath) {
    var defaultValue = schema.default;

    if ((0, _types.isFn)($path) && parentPath) {
      (0, _array.each)((0, _array.toArr)((0, _accessor.getIn)(initialValues, parentPath)), function (value, index) {
        $path(index);
      });
    } else if ($path) {
      var name = $path.path.join('.');
      var path = $path.path;
      var schemaPath = $path.schemaPath;
      var initialValue = (0, _accessor.getIn)(initialValues, name);
      var value = !(0, _isEmpty.isEmpty)(initialValue) ? initialValue : defaultValue;

      if (!(0, _isEmpty.isEmpty)(value)) {
        (0, _accessor.setIn)(initialValues, name, value);
      }

      if ((0, _types.isFn)(callback)) {
        var _path = {
          name: name,
          path: path,
          schemaPath: schemaPath
        };
        callback(_path, schema, value);
      }
    }
  });
  return initialValues;
};

exports.caculateSchemaInitialValues = caculateSchemaInitialValues;