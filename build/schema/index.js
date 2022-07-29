"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "validateLogin", {
  enumerable: true,
  get: function () {
    return _login.default;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }