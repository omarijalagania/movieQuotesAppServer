"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegister = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _models = require("../models");

var _schema = require("../schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRegister = async (req, res) => {
  const {
    user_name,
    password,
    repeatPassword,
    email
  } = req.body;
  const {
    error
  } = (0, _schema.validateRegister)(req.body);

  try {
    if (error) {
      return res.status(422).send(error.details[0].message);
    }

    const user = await _models.User.findOne({
      email: email
    });

    if (user) {
      return res.status(422).send('User already exists');
    }

    const salt = _bcryptjs.default.genSaltSync(10);

    const hashedPassword = _bcryptjs.default.hashSync(password, salt);

    const newUser = await _models.User.create({
      user_name: user_name,
      email: email,
      password: hashedPassword
    });

    if (newUser) {
      return res.status(201).send('User created successfully');
    }
  } catch (error) {
    res.status(500).send({
      error: 'something went wrong...'
    });
  }
};

exports.userRegister = userRegister;