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
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style="
          background: linear-gradient(
            187.16deg,
            #181623 0.07%,
            #191725 51.65%,
            #0d0b14 98.75%
          );
          height: 100vh;
          padding: 10px;
        "
      >
        <h3
          style="
            text-align: center;
            color: white;
            text-transform: uppercase;
            padding-top: 50px;
          "
        >
          Movie quotes
        </h3>
        <div style="width: 70%">
          <p style="color: white">Hola ${userName}!</p>
          <p style="color: white; padding: 20px 0px">
            Thanks for joining Movie quotes! We really appreciate it. Please click
            the button below to verify your account:
          </p>
          <a
            style="
              width: 128px;
              height: 38px;
              align-items: center;
              padding: 7px 13px;
              background-color: red;
              color: white;
              text-decoration: none;
            "
            href="http://localhost:4242/user/confirm/${token}"
            >Verify account</a
          >
          <p style="color: white; padding-top: 20px">
            If clicking doesn't work, you can try copying and pasting it to your
            browser:
          </p>
          <a style="color: #ddccaa" href="http://localhost:4242/user/confirm/${token}"
            >http://localhost:4242/user/confirm/${token}</a
          >
          <p style="color: white; padding-top: 20px">
            If you have any problems, please contact us: support@moviequotes.ge
          </p>
          <p style="color: white; padding-top: 20px">MovieQuotes Crew</p>
        </div>
      </body>
    </html>
    
    `,
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
