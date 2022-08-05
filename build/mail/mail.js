"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPasswordRecoveryEmail = exports.sendConfirmMail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendConfirmMail = async (email, token, userName) => {
  const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `<${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Confirm your email',
    html: (0, _index.confirmEmail)(userName, token)
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

exports.sendConfirmMail = sendConfirmMail;

const sendPasswordRecoveryEmail = async (email, token, userName) => {
  const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `<${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Password Recover',
    html: (0, _index.passwordRecoverTemplate)(userName, token)
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

exports.sendPasswordRecoveryEmail = sendPasswordRecoveryEmail;