"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateLogin = data => {
  const schema = _joi.default.object({
    email: _joi.default.string().email().required(),
    password: _joi.default.string().lowercase().min(8).max(15).required()
  });

  return schema.validate(data);
};

var _default = validateLogin;
exports.default = _default;