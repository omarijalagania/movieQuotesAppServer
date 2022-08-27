import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateRegularUser = (data: RegisterTypes) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.any(),
    oldPassword: Joi.any(),
    userName: Joi.string().lowercase().min(3).max(15),
    secondaryEmails: Joi.any(),
    poster: Joi.any(),
    token: Joi.string(),
  })

  return schema.validate(data)
}

export default validateRegularUser
