import { Request, Response } from 'express'
import { Movie } from 'models'
import mongoose from 'mongoose'
//import { validateMovie } from 'schema'

export const addMovieHandler = async (req: Request, res: Response) => {
  //const { error } = validateMovie(req.body)
  const poster = req?.file?.path

  // if (error) {
  //   return res.status(422).send(error.details[0].message)
  // }

  const data = {
    movieNameEn: req.body.movieNameEn,
    movieNameGe: req.body.movieNameGe,
    genre: JSON.parse(req.body.genre),
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

export const getAllMoviesHandler = async (req: Request, res: Response) => {
  const userId = req.params.userId

  const movies = await Movie.find({ userId })
  if (!movies) {
    return res.status(404).send('Movies not found')
  }
  return res.status(200).json(movies)
}

export const getSingleMovieHandler = async (req: Request, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)

  if (!isValid) {
    return res.status(422).send('Invalid id')
  }
  const movie = await Movie.findById(req.params.id, { __v: 0 })

  if (!movie) {
    return res.status(404).send('Movie not found')
  }

  return res.status(200).json(movie)
}

export const updateMovieHandler = async (req: Request, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)

  if (!isValid) {
    console.log('Invalid id')
    return res.status(422).send('Invalid id')
  }
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!movie) {
    return res.status(404).send('Movie not found')
  }

  return res.status(200).json(movie)
}

export const deleteMovieHandler = async (req: Request, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)

  if (!isValid) {
    console.log('Invalid id')
    return res.status(422).send('Invalid id')
  }

  const movie = await Movie.findOneAndDelete({ _id: req.params.id })

  if (!movie) {
    return res.status(404).send('Movie not found')
  }

  return res.status(200).json(movie)
}
