"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerController = require("./register-controller");

Object.keys(_registerController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _registerController[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _registerController[key];
    }
  });
});