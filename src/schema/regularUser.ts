import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateLogin = (data: RegisterTypes) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().lowercase().min(8).max(15),
    userName: Joi.string().lowercase().min(3).max(15),
    poster: Joi.any(),
  })

  return schema.validate(data)
}

export default validateLogin
