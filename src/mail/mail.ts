import nodemailer from 'nodemailer'
import { confirmEmail } from 'mail'

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
    html: confirmEmail(userName, token),
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
