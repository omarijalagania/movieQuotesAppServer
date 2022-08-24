import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateGoogle = (data: RegisterTypes) => {
  const schema = Joi.object({
    userName: Joi.string().lowercase().min(3).max(15).required(),
    provider: Joi.string(),
    poster: Joi.any(),
    email: Joi.string().email(),
    image: Joi.string(),
  })

  return schema.validate(data)
}

export default validateGoogle
