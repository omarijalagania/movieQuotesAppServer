"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegister = exports.userLogin = exports.userConfirm = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("../models");

var _schema = require("../schema");

var _mail = require("../mail");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRegister = async (req, res) => {
  const {
    user_name,
    password,
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

    const token = _jsonwebtoken.default.sign({
      _id: newUser._id,
      name: newUser.user_name
    }, process.env.TOKEN_SECRET);

    await (0, _mail.sendConfirmMail)(newUser.email, token, newUser.user_name);
    return res.status(200).send('Confirm Email sent');
  } catch (error) {
    res.status(500).send({
      error: 'something went wrong...'
    });
  }
};

exports.userRegister = userRegister;

const userConfirm = async (req, res) => {
  try {
    const {
      token
    } = req.params;
    console.log(token);

    const {
      _id
    } = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

    const user = await _models.User.findById(_id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.confirmed) {
      return res.status(422).send('User already confirmed');
    }

    user.confirmed = true;
    await user.save();
    return res.status(200).send('User confirmed');
  } catch (error) {
    res.status(500).send({
      error: 'something went wrong...'
    });
  }
};

exports.userConfirm = userConfirm;

const userLogin = async (req, res) => {
  const {
    error
  } = (0, _schema.validateLogin)(req.body);

  try {
    if (error) {
      return res.status(422).send(error.details[0].message);
    }

    const user = await _models.User.findOne({
      email: req.body.email
    });

    if (!user) {
      return res.status(422).send('Please provide valid credentials');
    }

    if (!user.confirmed) {
      return res.status(422).send('Please confirm your email');
    }

    const validPass = await _bcryptjs.default.compare(req.body.password, user.password);

    if (!validPass) {
      return res.status(422).send('Please provide valid credentials');
    }

    const token = _jsonwebtoken.default.sign({
      _id: user._id,
      name: user.user_name
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send({
      token: token
    });
  } catch (error) {
    res.status(500).send({
      error: 'something went wrong...'
    });
  }
};

exports.userLogin = userLogin;