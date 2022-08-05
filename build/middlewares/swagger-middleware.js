"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const swaggerMiddleware = () => {
  const swaggerDocument = _yamljs.default.load('src/config/swagger.yaml');

  return [_swaggerUiExpress.default.setup(swaggerDocument, {
    customSiteTitle: 'Band API'
  })];
};

var _default = swaggerMiddleware;
exports.default = _default;