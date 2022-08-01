import Joi from 'joi'
import { RegisterTypes } from 'types'

const validatePasswordRecover = (data: RegisterTypes) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  })

  return schema.validate(data)
}

export default validatePasswordRecover
