import Joi from 'joi'
import { quoteTypes } from 'types'

const validateLikes = (data: quoteTypes) => {
  const schema = Joi.object({
    quoteId: Joi.string(),
    userId: Joi.string(),
    likes: Joi.number(),
    isLiked: Joi.boolean(),
  })

  return schema.validate(data)
}

export default validateLikes
