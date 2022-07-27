"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authMiddleware", {
  enumerable: true,
  get: function () {
    return _authMiddleware.default;
  }
});
Object.defineProperty(exports, "swaggerMiddleware", {
  enumerable: true,
  get: function () {
    return _swaggerMiddleware.default;
  }
});

var _authMiddleware = _interopRequireDefault(require("./auth-middleware"));

var _swaggerMiddleware = _interopRequireDefault(require("./swagger-middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }