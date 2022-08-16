import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateNotifications = (data: RegisterTypes) => {
  const schema = Joi.object({
    userId: Joi.string(),
    notificationType: Joi.string(),
    isRead: Joi.boolean().required(),
    notificationFor: Joi.string(),
  })

  return schema.validate(data)
}

export default validateNotifications
