"use strict";

exports.__esModule = true;
exports.FormPath = void 0;

var _dotMatch = _interopRequireDefault(require("dot-match"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withFilter = function withFilter(result, filter, payload) {
  if ((0, _utils.isFn)(filter)) {
    return result && filter(payload);
  }

  return result;
};

var wildcardRE = /\.\s*\*\s*\.?/;
var FormPath = {
  match: function match(matchLanguage, matchRealPath, filter) {
    matchLanguage = matchLanguage + '';
    var match = (0, _dotMatch.default)(matchLanguage);

    if ((0, _utils.isFn)(matchRealPath)) {
      filter = matchRealPath;
      matchRealPath = false;
    }

    var matcher = function matcher(payload) {
      if (payload && payload.fieldState) {
        return withFilter(match((0, _utils.resolveFieldPath)(matchRealPath ? payload.fieldState.path : payload.fieldState.name)), filter, payload.fieldState);
      } else if (payload && payload.name && payload.path) {
        return withFilter(match((0, _utils.resolveFieldPath)(matchRealPath ? payload.path : payload.name)), filter, payload);
      } else if ((0, _utils.isStr)(payload)) {
        return withFilter(match((0, _utils.resolveFieldPath)(payload)), filter, {
          name: payload
        });
      } else if ((0, _utils.isArr)(payload)) {
        return withFilter(match(payload), filter, {
          path: payload
        });
      }

      return false;
    };

    matcher.hasWildcard = wildcardRE.test(matchLanguage);
    matcher.string = matchLanguage;
    return matcher;
  },
  exclude: function exclude(matcher) {
    return function (path) {
      return (0, _utils.isFn)(matcher) ? !matcher(path) : (0, _utils.isStr)(matcher) ? !FormPath.match(matcher)(path) : false;
    };
  },
  transform: function transform(path, regexp, calllback) {
    var args = (0, _utils.reduce)((0, _utils.resolveFieldPath)(path), function (buf, key) {
      return new RegExp(regexp).test(key) ? buf.concat(key) : buf;
    }, []);
    return calllback.apply(void 0, args);
  }
};
exports.FormPath = FormPath;