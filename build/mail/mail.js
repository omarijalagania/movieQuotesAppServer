"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendConfirmMail = async (email, token, user_name) => {
  const transporter = _nodemailer.default.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: '<omar.jalagania@gmail.com>',
    to: email,
    subject: 'Confirm your email',
    html: `Hello, ${user_name},  please confirm email by clicking on the link: <a href="http://localhost:4242/user/confirm/${token}">Confirm</a>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

var _default = sendConfirmMail;
exports.default = _default;