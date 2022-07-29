"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateRegister = data => {
  const schema = _joi.default.object({
    email: _joi.default.string().email().required(),
    user_name: _joi.default.string().lowercase().min(3).max(15).required(),
    password: _joi.default.string().lowercase().min(8).max(15).required(),
    repeatPassword: _joi.default.string().valid(_joi.default.ref('password')).required().messages({
      'any.only': 'passwords does not match'
    })
  });

  return schema.validate(data);
};

var _default = validateRegister;
exports.default = _default;