import Joi from 'joi'
import { RegisterTypes } from 'types'

const validateMovie = (data: RegisterTypes) => {
  const schema = Joi.object({
    movieNameEn: Joi.string(),
    movieNameGe: Joi.string(),
    genre: Joi.array()
      .items(
        Joi.object({
          genre: Joi.string(),
          label: Joi.string(),
        })
      )
      .has(Joi.object({ genre: Joi.string(), label: Joi.string() })),
    directorEn: Joi.string(),
    directorGe: Joi.string(),
    descriptionEn: Joi.string(),
    descriptionGe: Joi.string(),
    poster: Joi.string(),
    userId: Joi.string(),
  })

  return schema.validate(data)
}

export default validateMovie
