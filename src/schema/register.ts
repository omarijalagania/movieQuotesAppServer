import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateRegister = (data: RegisterTypes) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    user_name: Joi.string().lowercase().min(3).max(15).required(),
    password: Joi.string().lowercase().min(8).max(15).required(),
    repeatPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({ 'any.only': 'passwords does not match' }),
  })

  return schema.validate(data)
}

export default validateRegister
