import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from 'models'
import { validateRegister } from 'schema'

export const userRegister = async (req: Request, res: Response) => {
  const { user_name, password, repeatPassword, email } = req.body
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
      user_name: user_name,
      email: email,
      password: hashedPassword,
    })
    if (newUser) {
      return res.status(201).send('User created successfully')
    }
  } catch (error) {
    res.status(500).send({ error: 'something went wrong...' })
  }
}
