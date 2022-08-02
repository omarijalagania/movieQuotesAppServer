import Joi from 'joi'
import { RegisterTypes } from 'types'

const validatePasswords = (data: RegisterTypes) => {
  const schema = Joi.object({
    password: Joi.string().lowercase().min(8).max(15).required(),
    repeatPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({ 'any.only': 'passwords does not match' }),
    token: Joi.string().required(),
  })

  return schema.validate(data)
}

export default validatePasswords
