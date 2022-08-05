"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/register', _controllers.userRegister);
router.post('/register/google', _controllers.googleLogin);
router.post('/login', _controllers.userLogin);
router.post('/confirm', _controllers.userConfirm);
router.post('/password/recover', _controllers.userPasswordRecoverEMail);
router.post('/password/new', _controllers.newUserPassword);
var _default = router;
exports.default = _default;