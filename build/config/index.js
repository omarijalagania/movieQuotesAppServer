"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  connectDB: true
};
Object.defineProperty(exports, "connectDB", {
  enumerable: true,
  get: function () {
    return _mongo.default;
  }
});

var _mongo = _interopRequireDefault(require("./mongo"));

var _connectionFunctions = require("./connection-functions");

Object.keys(_connectionFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _connectionFunctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _connectionFunctions[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }