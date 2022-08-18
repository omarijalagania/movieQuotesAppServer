import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from 'models'
import {
  validateGoogle,
  validateLogin,
  validatePasswordRecover,
  validateRegister,
} from 'schema'
import { sendConfirmMail, sendPasswordRecoveryEmail } from 'mail'
import validatePasswords from 'schema/passwords'

export const userRegister = async (req: Request, res: Response) => {
  const { userName, password, email } = req.body
  const { error } = validateRegister(req.body)

  try {
    if (error) {
      return res.status(422).send(error.details[0].message)
    }

    const user = await User.findOne({ email: email })

    if (user) {
      return res.status(422).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    })

    const token = jwt.sign(
      { _id: newUser._id, name: newUser.userName },
      process.env.TOKEN_SECRET
    )

    await sendConfirmMail(newUser.email, token, newUser.userName)

    return res.status(200).send('Confirm Email sent')
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}

export const userConfirm = async (req: Request, res: Response) => {
  try {
    const token = req.body.token
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET) as any
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).send('User not found')
    }

    if (user.confirmed) {
      return res.status(422).send('User already confirmed')
    }

    user.confirmed = true
    await user.save()

    return res.status(200).send('User confirmed')
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}

export const userLogin = async (req: Request, res: Response) => {
  const { error } = validateLogin(req.body)

  try {
    if (error) {
      return res.status(422).send(error.details[0].message)
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(422).send('Please provide valid credentials')
    }

    if (!user.confirmed) {
      return res.status(422).send('Please confirm your email')
    }

    const validPass = await bcrypt.compare(
      req.body.password,
      user.password as string
    )
    if (!validPass) {
      return res.status(422).send('Please provide valid credentials')
    }

    const token = jwt.sign(
      { _id: user._id, name: user.email },
      process.env.TOKEN_SECRET
    )
    res.header('auth-token', token).send({ token: token })
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}

export const googleLogin = async (req: Request, res: Response) => {
  const { error } = validateGoogle(req.body)

  try {
    if (error) {
      return res.status(422).send(error.details[0].message)
    }

    const user = await User.find({ email: req.body.email })

    if (user.length > 0) {
      return res.status(422).send('User already exists')
    }

    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
    })

    const token = jwt.sign(
      { _id: newUser._id, name: newUser.email },
      process.env.TOKEN_SECRET
    )
    return res.status(200).send(token)
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}

export const userPasswordRecoverEMail = async (req: Request, res: Response) => {
  const { error } = validatePasswordRecover(req.body)
  try {
    if (error) {
      return res.status(422).send(error.details[0].message)
    }

    const isMailExist = await User.findOne({ email: req.body.email })

    if (!isMailExist) {
      return res.status(422).send('Email not found')
    }

    const token = jwt.sign(
      { _id: isMailExist._id, name: isMailExist.userName },
      process.env.TOKEN_SECRET
    )

    await sendPasswordRecoveryEmail(
      isMailExist.email,
      token,
      isMailExist.userName
    )

    return res.status(200).send('Password Recovery Email sent')
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}

export const newUserPassword = async (req: Request, res: Response) => {
  const { error } = validatePasswords(req.body)

  try {
    if (error) {
      return res.status(422).send(error.details[0].message)
    }

    const token = req.body.token
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET) as any
    const user = await User.findById(_id)

    if (!user) {
      return res.status(422).send('User not found')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    user.password = hashedPassword
    await user.save()

    return res.status(200).send('Password changed')
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(422).send('User not found')
    }

    return res.status(200).json(user)
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)

    if (!user) {
      return res.status(422).send('User not found')
    }

    return res.status(200).json(user)
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}
