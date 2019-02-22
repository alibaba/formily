"use strict";

exports.__esModule = true;
exports.getPathSegments = getPathSegments;
exports.parsePaths = exports.parseDestruct = exports.parseDesturctPath = exports.existIn = exports.deleteIn = exports.setIn = exports.getIn = void 0;

var _types = require("./types");

var _array = require("./array");

var _lru = require("./lru");

function whitespace(c) {
  return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
}

function toString(val) {
  if (!val) return '';

  if ((0, _types.isArr)(val)) {
    return val.join('.');
  }

  return (0, _types.isStr)(val) ? val : '';
}

var PathCache = new _lru.LRUMap(1000);

function getPathSegments(path) {
  if ((0, _types.isArr)(path)) return path;

  if ((0, _types.isStr)(path) && path) {
    var cached = PathCache.get(path);
    if (cached) return cached;
    var pathArr = path.split('.');
    var parts = [];

    for (var i = 0; i < pathArr.length; i++) {
      var p = pathArr[i];

      while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
        p = p.slice(0, -1) + '.';
        p += pathArr[++i];
      }

      parts.push(p);
    }

    PathCache.set(path, parts);
    return parts;
  }

  return [];
}

var DestructTokenizer =
/*#__PURE__*/
function () {
  function DestructTokenizer(text, cbs) {
    this.text = text;
    this.index = 0;
    this.cbs = cbs;
    this.state = this.processNameStart;
    this.declareNameStart = 0;
    this.declareNameEnd = 0;
    this.nbraceCount = 0;
    this.nbracketCount = 0;
  }

  var _proto = DestructTokenizer.prototype;

  _proto.goto = function goto(name) {
    this.state = this.StateMap[name];
  };

  _proto.parse = function parse() {
    var char = '';
    var prev = '';
    var l = this.text.length;

    for (; this.index < l; this.index++) {
      char = this.text.charAt(this.index);
      this.EOF = l - 1 === this.index;
      this.state(char, prev);
      prev = char;
    }
  };

  _proto.processNameStart = function processNameStart(char) {
    if (char === '{' || char === '[') {
      this.state = this.processDestructStart;
      this.index--;
    } else if (!whitespace(char)) {
      this.declareNameStart = this.index;
      this.state = this.processName;
    }
  };

  _proto.processName = function processName(char, prev) {
    if (whitespace(char)) {
      this.declareNameEnd = this.index;
      this.cbs.name(this.getName());
    } else if (this.EOF) {
      this.declareNameEnd = this.index + 1;
      this.cbs.name(this.getName());
    }
  };

  _proto.processDestructStart = function processDestructStart(char) {
    if (char === '{') {
      this.nbraceCount++;
      this.cbs.destructObjectStart();
    } else if (char === '[') {
      this.nbracketCount++;
      this.cbs.destructArrayStart();
    } else if (!whitespace(char)) {
      this.state = this.processDestructKey;
      this.destructKeyStart = this.index;
      this.index--;
    }
  };

  _proto.processDestructKey = function processDestructKey(char, prev) {
    if (char === '}') {
      this.nbraceCount--;

      if (this.nbraceCount || this.nbracketCount) {
        this.state = this.processDestructStart;
      }

      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(this.destructKeyStart, this.index);
      }

      this.cbs.destructKey(this.destructKey);
      this.cbs.destructObjectEnd();

      if (!this.nbraceCount && !this.nbracketCount) {
        this.index = this.text.length;
      }
    } else if (char === ']') {
      this.nbracketCount--;

      if (this.nbraceCount || this.nbracketCount) {
        this.state = this.processDestructStart;
      }

      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(this.destructKeyStart, this.index);
      }

      this.cbs.destructKey(this.destructKey);
      this.cbs.destructArrayEnd();

      if (!this.nbraceCount && !this.nbracketCount) {
        this.index = this.text.length;
      }
    } else if (whitespace(char) || char === ':' || char === ',') {
      if (!whitespace(prev)) {
        this.destructKey = this.text.substring(this.destructKeyStart, this.index);
      }

      if (!whitespace(char)) {
        this.state = this.processDestructStart;
        this.cbs.destructKey(this.destructKey, char === ':');
      }
    }
  };

  _proto.getName = function getName() {
    return this.text.substring(this.declareNameStart, this.declareNameEnd);
  };

  return DestructTokenizer;
}();

var parseDestruct = function parseDestruct(string) {
  if (!(0, _types.isStr)(string)) return string;
  var destruct;
  var stack = [];
  var token = '';
  var realKey = '';
  var lastDestruct;
  var root;
  new DestructTokenizer(string, {
    name: function name(key) {
      root = key;
    },
    destructKey: function destructKey(key, readyReplace) {
      if (!key) return;
      token = key;

      if (readyReplace) {
        realKey = key;
        lastDestruct = destruct;
        return;
      }

      if ((0, _types.isArr)(destruct)) {
        destruct.push(key);
      } else if ((0, _types.isPlainObj)(destruct)) {
        destruct[realKey && lastDestruct === destruct ? realKey : key] = key;
      }

      realKey = '';
      lastDestruct = destruct;
    },
    destructArrayStart: function destructArrayStart() {
      if (!destruct) {
        root = [];
        destruct = root;
      } else {
        destruct = [];
      }

      var tail = stack[stack.length - 1];

      if ((0, _types.isPlainObj)(tail)) {
        tail[token] = destruct;
      } else if ((0, _types.isArr)(tail)) {
        tail.push(destruct);
      }

      stack.push(destruct);
    },
    destructObjectStart: function destructObjectStart() {
      if (!destruct) {
        root = {};
        destruct = root;
      } else {
        destruct = {};
      }

      var tail = stack[stack.length - 1];

      if ((0, _types.isPlainObj)(tail)) {
        tail[token] = destruct;
      } else if ((0, _types.isArr)(tail)) {
        tail.push(destruct);
      }

      stack.push(destruct);
    },
    destructArrayEnd: function destructArrayEnd() {
      stack.pop();
      destruct = stack[stack.length - 1];
    },
    destructObjectEnd: function destructObjectEnd() {
      stack.pop();
      destruct = stack[stack.length - 1];
    }
  }).parse();
  return root;
};

exports.parseDestruct = parseDestruct;

var traverse = function traverse(obj, callback) {
  var _traverse = function _traverse(obj, path, callback) {
    if ((0, _types.isStr)(obj)) return callback(obj, obj);
    (0, _array.each)(obj, function (item, key) {
      var _path = path.concat(key);

      if ((0, _types.isArr)(item) || (0, _types.isPlainObj)(item)) {
        _traverse(item, _path, callback);
      } else {
        callback(_path, item);
      }
    });
  };

  return _traverse(obj, [], callback);
};

var mapReduce = function mapReduce(obj, callback) {
  var _traverse = function _traverse(obj, path, callback) {
    return (0, _array.map)(obj, function (item, key) {
      var _path = path.concat(key);

      if ((0, _types.isArr)(item) || (0, _types.isPlainObj)(item)) {
        return _traverse(item, _path, callback);
      } else {
        return callback(_path, item);
      }
    });
  };

  return _traverse(obj, [], callback);
};

var parseDesturctPath = function parseDesturctPath(path) {
  var _path = getPathSegments(path);

  var lastKey = _path[_path.length - 1];

  var startPath = _path.slice(0, _path.length - 1);

  var destruct = parseDestruct(lastKey);
  return {
    path: _path,
    lastKey: lastKey,
    startPath: startPath,
    destruct: destruct
  };
};

exports.parseDesturctPath = parseDesturctPath;

var parsePaths = function parsePaths(path) {
  var result = [];
  var parsed = parseDesturctPath(path);

  if ((0, _types.isStr)(parsed.destruct)) {
    return path;
  } else if (parsed.destruct) {
    traverse(parsed.destruct, function (path, key) {
      result.push({
        path: parsed.startPath.concat(path),
        startPath: parsed.startPath,
        endPath: path,
        key: key
      });
    });
    return result;
  } else {
    return path;
  }
};

exports.parsePaths = parsePaths;

var resolveGetIn = function resolveGetIn(get) {
  var cache = new Map();
  return function (obj, path, value) {
    var ast = null;

    if (!(ast = cache.get(path))) {
      ast = parseDesturctPath(path);
      cache.set(path, ast);
    }

    if (!(0, _types.isArr)(ast.destruct) && !(0, _types.isPlainObj)(ast.destruct)) {
      return get(obj, path, value);
    }

    return mapReduce(ast.destruct, function (path, key) {
      return get(obj, key);
    });
  };
};

var resolveUpdateIn = function resolveUpdateIn(update, getIn) {
  var cache = new Map();
  return function (obj, path, value) {
    var paths = [];

    if (!(paths = cache.get(path))) {
      paths = parsePaths(path);
      cache.set(path, paths);
    }

    if (!(0, _types.isArr)(paths)) return update(obj, path, value);

    if (paths && paths.length) {
      (0, _array.each)(paths, function (_ref) {
        var path = _ref.path,
            key = _ref.key,
            startPath = _ref.startPath,
            endPath = _ref.endPath;
        update(obj, startPath.concat(key), getIn(value, endPath));
      });
    }

    return obj;
  };
};

var resolveExistIn = function resolveExistIn(has) {
  var cache = new Map();
  return function (obj, path) {
    var paths = [];

    if (!(paths = cache.get(path))) {
      paths = parsePaths(path);
      cache.set(path, paths);
    }

    if (!(0, _types.isArr)(paths)) {
      return has(obj, path);
    }

    if (paths && paths.length) {
      return (0, _array.every)(paths, function (_ref2) {
        var startPath = _ref2.startPath,
            key = _ref2.key;
        return has(obj, startPath.concat(key));
      });
    }

    return false;
  };
};

function _getIn(obj, path, value) {
  if (!(0, _types.isObj)(obj) || !path) {
    return obj;
  }

  path = toString(path);

  if (path in obj) {
    return obj[path];
  }

  var pathArr = getPathSegments(path);

  for (var i = 0; i < pathArr.length; i++) {
    if (!Object.prototype.propertyIsEnumerable.call(obj, pathArr[i])) {
      return value;
    }

    obj = obj[pathArr[i]];

    if (obj === undefined || obj === null) {
      // `obj` is either `undefined` or `null` so we want to stop the loop, and
      // if this is not the last bit of the path, and
      // if it did't return `undefined`
      // it would return `null` if `obj` is `null`
      // but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
      if (i !== pathArr.length - 1) {
        return value;
      }

      break;
    }
  }

  return obj;
}

function _setIn(obj, path, value) {
  if (!(0, _types.isObj)(obj) || !path) {
    return;
  }

  path = toString(path);

  if (path in obj) {
    obj[path] = value;
    return;
  }

  var pathArr = getPathSegments(path);

  for (var i = 0; i < pathArr.length; i++) {
    var p = pathArr[i];

    if (!(0, _types.isObj)(obj[p])) {
      obj[p] = {};
    }

    if (i === pathArr.length - 1) {
      obj[p] = value;
    }

    obj = obj[p];
  }
}

function _deleteIn(obj, path) {
  if (!(0, _types.isObj)(obj) || !path) {
    return;
  }

  path = toString(path);

  if (path in obj) {
    delete obj[path];
    return;
  }

  var pathArr = getPathSegments(path);

  for (var i = 0; i < pathArr.length; i++) {
    var p = pathArr[i];

    if (i === pathArr.length - 1) {
      if ((0, _types.isArr)(obj)) {
        obj.splice(p, 1);
      } else {
        delete obj[p];
      }

      return;
    }

    obj = obj[p];

    if (!(0, _types.isObj)(obj)) {
      return;
    }
  }
}

function _existIn(obj, path) {
  if (!(0, _types.isObj)(obj) || !path) {
    return false;
  }

  path = toString(path);

  if (path in obj) {
    return true;
  }

  var pathArr = getPathSegments(path);

  for (var i = 0; i < pathArr.length; i++) {
    if ((0, _types.isObj)(obj)) {
      if (!(pathArr[i] in obj)) {
        return false;
      }

      obj = obj[pathArr[i]];
    } else {
      return false;
    }
  }

  return true;
}

var getIn = resolveGetIn(_getIn);
exports.getIn = getIn;
var setIn = resolveUpdateIn(_setIn, getIn);
exports.setIn = setIn;
var deleteIn = resolveUpdateIn(_deleteIn, getIn);
exports.deleteIn = deleteIn;
var existIn = resolveExistIn(_existIn);
exports.existIn = existIn;