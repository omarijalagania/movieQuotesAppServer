export const confirmEmail = (userName: string, token: string) => {
  return `
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
            href="${process.env.FRONTEND_URL}/home/confirm/${token}"
            >Verify account</a
          >
          <p style="color: white; padding-top: 20px">
            If clicking doesn't work, you can try copying and pasting it to your
            browser:
          </p>
          <a style="color: #ddccaa" href="${process.env.FRONTEND_URL}/home/confirm/${token}"
            >${process.env.FRONTEND_URL}/home/confirm/${token}</a
          >
          <p style="color: white; padding-top: 20px">
            If you have any problems, please contact us: support@moviequotes.ge
          </p>
          <p style="color: white; padding-top: 20px">MovieQuotes Crew</p>
        </div>
      </body>
    </html>
    
    `
}

export const passwordRecoverTemplate = (userName: string, token: string) => {
  return `
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
            Here is your link to reset your password:
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
            href="${process.env.FRONTEND_URL}/home/password/recover/${token}"
            >Recover Password</a
          >
          <p style="color: white; padding-top: 20px">
            If clicking doesn't work, you can try copying and pasting it to your
            browser:
          </p>
          <a style="color: #ddccaa" href="${process.env.FRONTEND_URL}/home/password/recovery/${token}"
            >${process.env.FRONTEND_URL}/home/password/recover/${token}</a
          >
          <p style="color: white; padding-top: 20px">
            If you have any problems, please contact us: support@moviequotes.ge
          </p>
          <p style="color: white; padding-top: 20px">MovieQuotes Crew</p>
        </div>
      </body>
    </html>
    
    `
}
