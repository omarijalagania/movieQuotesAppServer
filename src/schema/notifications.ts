import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateNotifications = (data: RegisterTypes) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    notificationType: Joi.string().required(),
    isRead: Joi.boolean().required(),
    notificationFor: Joi.string().required(),
  })

  return schema.validate(data)
}

export default validateNotifications
