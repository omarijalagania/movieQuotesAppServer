import { Request, Response } from 'express'
import { Movie } from 'models'
import { validateMovie } from 'schema'

export const addMovieHandler = async (req: Request, res: Response) => {
  const { error } = validateMovie(req.body)
  const poster = req?.file?.path

  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const data = {
    movieNameEn: req.body.movieNameEn,
    movieNameGe: req.body.movieNameGe,
    genre: req.body.genre,
    directorEn: req.body.directorEn,
    directorGe: req.body.directorGe,
    descriptionEn: req.body.descriptionEn,
    descriptionGe: req.body.descriptionGe,
    poster: poster,
    userId: req.body.userId,
  }

  const movie = await Movie.create(data)

  return res.status(200).json(movie)
}

export const getAllMoviesHandler = async (_: Request, res: Response) => {
  const movies = await Movie.find({}, { __v: 0 })

  return res.status(200).json(movies)
}
