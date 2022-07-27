"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectDB = async close => {
  try {
    let connectionUrl;

    if (process.env.MONGO_PROTOCOL === 'mongodb') {
      connectionUrl = (0, _index.compassMongoConnection)();
    } else {
      connectionUrl = (0, _index.atlasMongoConnection)();
    }

    const connect = await _mongoose.default.connect(connectionUrl);
    console.log(`MongoDB Connected: ${connect.connection.host}`);

    if (close) {
      await _mongoose.default.connection.close();
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

var _default = connectDB;
exports.default = _default;