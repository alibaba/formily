"use strict";

exports.__esModule = true;
exports.getMessage = exports.setLanguage = exports.setLocale = void 0;

var _utils = require("./utils");

var _locale = _interopRequireDefault(require("./locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var self = void 0 || global || window;

var getBrowserlanguage = function getBrowserlanguage() {
  if (!self.navigator) return 'en';
  return self.navigator.browserlanguage || self.navigator.language || 'en';
};

var LOCALE = {
  messages: {},
  lang: getBrowserlanguage()
};

var getMatchLang = function getMatchLang(lang) {
  var find = LOCALE.lang;
  (0, _utils.each)(LOCALE.messages, function (messages, key) {
    if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
      find = key;
      return false;
    }
  });
  return find;
};

var setLocale = function setLocale(locale) {
  Object.assign(LOCALE.messages, locale);
};

exports.setLocale = setLocale;

var setLanguage = function setLanguage(lang) {
  LOCALE.lang = lang;
};

exports.setLanguage = setLanguage;

var getMessage = function getMessage(path) {
  return (0, _utils.getIn)(LOCALE.messages, getMatchLang(LOCALE.lang) + "." + path);
};

exports.getMessage = getMessage;
setLocale(_locale.default);