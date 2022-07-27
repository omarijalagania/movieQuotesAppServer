"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerSchema = new _mongoose.default.Schema({
  user_name: {
    type: String,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  repeatPassword: {
    type: String
  }
});

var _default = _mongoose.default.model('User', registerSchema);

exports.default = _default;