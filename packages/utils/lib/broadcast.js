"use strict";

exports.__esModule = true;
exports.Broadcast = void 0;

var _array = require("./array");

var _types = require("./types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Broadcast =
/*#__PURE__*/
function () {
  function Broadcast() {
    _defineProperty(this, "entries", []);

    _defineProperty(this, "buffer", []);
  }

  var _proto = Broadcast.prototype;

  _proto.subscribe = function subscribe(subscriber, subscription) {
    var _this = this;

    if (!(0, _types.isFn)(subscriber)) return function () {};
    var index = this.entries.length;
    this.entries.push({
      subscriber: subscriber,
      subscription: subscription
    });
    this.flushBuffer(this.entries[index]);
    return function () {
      _this.entries.splice(index, 1);
    };
  };

  _proto.unsubscribe = function unsubscribe() {
    this.entries.length = 0;
    this.buffer.length = 0;
  };

  _proto.flushBuffer = function flushBuffer(_ref) {
    var subscriber = _ref.subscriber,
        subscription = _ref.subscription;
    (0, _array.each)(this.buffer, function (_ref2) {
      var payload = _ref2.payload,
          filter = _ref2.filter;

      if ((0, _types.isFn)(filter)) {
        var notification;

        if (notification = filter(payload, subscription)) {
          subscriber(notification);
        }
      } else {
        subscriber(payload, subscription);
      }
    });
  };

  _proto.notify = function notify(payload, filter) {
    if (this.length === 0) {
      this.buffer.push({
        payload: payload,
        filter: filter
      });
      return;
    }

    (0, _array.each)(this.entries, function (_ref3) {
      var subscriber = _ref3.subscriber,
          subscription = _ref3.subscription;

      if ((0, _types.isFn)(filter)) {
        var notification;

        if (notification = filter(payload, subscription)) {
          subscriber(notification);
        }
      } else {
        subscriber(payload, subscription);
      }
    });
    this.buffer.length = 0;
  };

  return Broadcast;
}();

exports.Broadcast = Broadcast;