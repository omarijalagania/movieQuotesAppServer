"use strict";

var dotenv = _interopRequireWildcard(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = require("./config");

var _routes = require("./routes");

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config({
  path: _path.default.resolve(__dirname, '../.env')
});
const app = (0, _express.default)();
app.use(_express.default.json());
(0, _config.connectDB)(false);
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use('/images', _express.default.static(_path.default.join(__dirname, 'public')));
app.use('/user', _routes.RegisterRouter); //@ts-ignore

app.use('/api-docs', _middlewares.authMiddleware, (0, _middlewares.swaggerMiddleware)());
app.listen(process.env.PORT || '4400', () => {
  console.log(`Server is running on: ${process.env.BASE_URL}:${process.env.PORT}`);
});