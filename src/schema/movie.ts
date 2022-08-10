import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateMovie = (data: RegisterTypes) => {
  const schema = Joi.object({
    movieNameEn: Joi.string().required(),
    movieNameGe: Joi.string().required(),
    genre: Joi.string().required(),
    directorEn: Joi.string().required(),
    directorGe: Joi.string().required(),
    descriptionEn: Joi.string().required(),
    descriptionGe: Joi.string().required(),
    userId: Joi.string(),
    poster: Joi.string(),
  })

  return schema.validate(data)
}

export default validateMovie
