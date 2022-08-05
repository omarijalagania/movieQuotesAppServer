"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "validateGoogle", {
  enumerable: true,
  get: function () {
    return _google.default;
  }
});
Object.defineProperty(exports, "validateLogin", {
  enumerable: true,
  get: function () {
    return _login.default;
  }
});
Object.defineProperty(exports, "validatePasswordRecover", {
  enumerable: true,
  get: function () {
    return _recover.default;
  }
});
Object.defineProperty(exports, "validateRegister", {
  enumerable: true,
  get: function () {
    return _register.default;
  }
});

var _register = _interopRequireDefault(require("./register"));

var _login = _interopRequireDefault(require("./login"));

var _google = _interopRequireDefault(require("./google"));

var _recover = _interopRequireDefault(require("./recover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }