import nodemailer from 'nodemailer'

const sendConfirmMail = async (
  email: string,
  token: string,
  userName: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  const mailOptions = {
    from: `<${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Confirm your email',
    html: `Hello, ${userName},  please confirm email by clicking on the link: <a href="http://localhost:4242/user/confirm/${token}">Confirm</a>`,
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

export default sendConfirmMail
