import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateGoogle = (data: RegisterTypes) => {
  const schema = Joi.object({
    userName: Joi.string().lowercase().min(3).max(15).required(),
    email: Joi.string().email().required(),
  })

  return schema.validate(data)
}

export default validateGoogle
