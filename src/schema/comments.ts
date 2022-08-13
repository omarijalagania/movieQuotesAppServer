import Joi from 'joi'

const validateQuote = (data: any) => {
  const schema = Joi.object({
    quoteId: Joi.string().required(),
    userId: Joi.string().required(),
    comment: Joi.string().required(),
  })

  return schema.validate(data)
}

export default validateQuote
