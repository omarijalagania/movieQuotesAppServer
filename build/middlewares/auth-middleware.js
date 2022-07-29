"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authMiddleware = (req, res, next) => {
  const {
    authorization
  } = req.headers;

  if (!authorization) {
    res.status(403).send("not authorized");
  } else {
    const [, token] = authorization.trim().split(" ");

    if (!token) {
      res.status(403).send("empty token");
    }

    const verified = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

    if (verified) {
      next();
    } else {
      res.status(403).send("token not verified");
    }
  }
};

var _default = authMiddleware;
exports.default = _default;