import Joi from 'joi'
import { quoteTypes } from 'types'

const validateQuote = (data: quoteTypes) => {
  const schema = Joi.object({
    quoteNameEng: Joi.string().required(),
    quoteNameGe: Joi.string().required(),
    movieId: Joi.string().required(),
    userId: Joi.string(),
    poster: Joi.string(),
  })

  return schema.validate(data)
}

export default validateQuote
