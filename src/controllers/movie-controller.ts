import { Request, Response } from 'express'
import { Movie } from 'models'
import mongoose from 'mongoose'
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
  const userId = req?.params?.userId
  const isValid = mongoose.Types.ObjectId.isValid(userId)

  if (!isValid) {
    return res.status(422).send('Invalid id')
  }

  const movies = await Movie.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },

    {
      $lookup: {
        from: 'quotes',
        localField: '_id',
        foreignField: 'movieId',
        as: 'quotes',
      },
    },
  ])

  if (!movies) {
    return res.status(404).send('Movies not found')
  }
  return res.status(200).json(movies)
}

export const getMoviesHandlerNoId = async (_: Request, res: Response) => {
  const movies = await Movie.aggregate([
    {
      $lookup: {
        from: 'quotes',
        localField: '_id',
        foreignField: 'movieId',
        as: 'quotes',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
  ])

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
  const movie = await Movie.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
    },

    {
      $lookup: {
        from: 'quotes',
        localField: '_id',
        foreignField: 'movieId',
        as: 'quotes',
      },
    },
  ])

  if (!movie) {
    return res.status(404).send('Movie not found')
  }

  return res.status(200).json(...movie)
}

export const updateMovieHandler = async (req: Request, res: Response) => {
  const { error } = validateMovie(req.body)

  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
  const poster = req?.file?.path
  if (!isValid) {
    return res.status(422).send('Invalid id')
  }
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    $set: {
      movieNameEn: req.body.movieNameEn,
      movieNameGe: req.body.movieNameGe,
      genre: JSON.parse(req.body.genre),
      directorEn: req.body.directorEn,
      directorGe: req.body.directorGe,
      descriptionEn: req.body.descriptionEn,
      descriptionGe: req.body.descriptionGe,
      poster: poster,
      userId: req.body.userId,
    },
  })

  if (!movie) {
    return res.status(404).send('Movie not found')
  }

  return res.status(200).json(movie)
}

export const deleteMovieHandler = async (req: Request, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)

  if (!isValid) {
    return res.status(422).send('Invalid id')
  }

  const movie = await Movie.findOneAndDelete({ _id: req.params.id })

  if (!movie) {
    return res.status(404).send('Movie not found')
  }

  return res.status(200).json(movie)
}
