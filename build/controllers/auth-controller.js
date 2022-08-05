"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegister = exports.userPasswordRecoverEMail = exports.userLogin = exports.userConfirm = exports.newUserPassword = exports.googleLogin = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("../models");

var _schema = require("../schema");

var _mail = require("../mail");

var _passwords = _interopRequireDefault(require("../schema/passwords"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRegister = async (req, res) => {
  const {
    userName,
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
      userName: userName,
      email: email,
      password: hashedPassword
    });

    const token = _jsonwebtoken.default.sign({
      _id: newUser._id,
      name: newUser.userName
    }, process.env.TOKEN_SECRET);

    await (0, _mail.sendConfirmMail)(newUser.email, token, newUser.userName);
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
    const token = req.body.token;

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

    console.log(validPass);

    const token = _jsonwebtoken.default.sign({
      _id: user._id,
      name: user.email
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

const googleLogin = async (req, res) => {
  const {
    error
  } = (0, _schema.validateGoogle)(req.body);

  try {
    if (error) {
      return res.status(422).send(error.details[0].message);
    }

    const user = await _models.User.findOne({
      email: req.body.email
    });

    if (user) {
      return res.status(422).send('User already exists');
    }

    const newUser = await _models.User.create({
      userName: req.body.userName,
      email: req.body.email
    });

    const token = _jsonwebtoken.default.sign({
      _id: newUser._id,
      name: newUser.userName
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

exports.googleLogin = googleLogin;

const userPasswordRecoverEMail = async (req, res) => {
  const {
    error
  } = (0, _schema.validatePasswordRecover)(req.body);

  try {
    if (error) {
      return res.status(422).send(error.details[0].message);
    }

    const isMailExist = await _models.User.findOne({
      email: req.body.email
    });

    if (!isMailExist) {
      return res.status(422).send('Email not found');
    }

    const token = _jsonwebtoken.default.sign({
      _id: isMailExist._id,
      name: isMailExist.userName
    }, process.env.TOKEN_SECRET);

    await (0, _mail.sendPasswordRecoveryEmail)(isMailExist.email, token, isMailExist.userName);
    return res.status(200).send('Password Recovery Email sent');
  } catch (error) {
    res.status(500).send({
      error: 'something went wrong...'
    });
  }
};

exports.userPasswordRecoverEMail = userPasswordRecoverEMail;

const newUserPassword = async (req, res) => {
  const {
    error
  } = (0, _passwords.default)(req.body);

  try {
    if (error) {
      return res.status(422).send(error.details[0].message);
    }

    const token = req.body.token;

    const {
      _id
    } = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

    const user = await _models.User.findById(_id);

    if (!user) {
      return res.status(422).send('User not found');
    }

    const salt = _bcryptjs.default.genSaltSync(10);

    const hashedPassword = _bcryptjs.default.hashSync(req.body.password, salt);

    user.password = hashedPassword;
    await user.save();
    return res.status(200).send('Password changed');
  } catch (error) {
    res.status(500).send({
      error: 'something went wrong...'
    });
  }
};

exports.newUserPassword = newUserPassword;