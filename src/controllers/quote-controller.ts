import { Request, Response } from 'express'
import { Quote } from 'models'
import mongoose from 'mongoose'
import { validateQuote } from 'schema'

export const addQuoteHandler = async (req: Request, res: Response) => {
  const { error } = validateQuote(req.body)
  const poster = req?.file?.path

  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const data = {
    quoteNameEng: req.body.quoteNameEng,
    quoteNameGe: req.body.quoteNameGe,
    movieId: req.body.movieId,
    userId: req.body.userId,
    poster: poster,
  }

  const quote = await Quote.create(data)

  return res.status(200).json(quote)
}

export const editQuoteHandler = async (req: Request, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)

  if (!isValid) {
    return res.status(422).send('Invalid id')
  }

  const poster = req?.file?.path

  const { error } = validateQuote(req.body)

  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const quote = await Quote.findOneAndUpdate(
    { movieId: req.params.id },
    {
      $set: {
        quoteNameEng: req.body.quoteNameEng,
        quoteNameGe: req.body.quoteNameGe,
        movieId: req.body.movieId,
        userId: req.body.userId,
        poster: poster,
      },
    }
  )

  return res.status(200).json(quote)
}

export const getQuoteHandler = async (req: Request, res: Response) => {
  const { page = req.query.page, limit = req.query.limit } = req.query

  const quote = await Quote.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'quoteId',
        as: 'comments',
      },
    },

    {
      $lookup: {
        from: 'movies',
        localField: 'movieId',
        foreignField: '_id',
        as: 'movie',
      },
    },

    {
      $sort: {
        _id: -1,
      },
    },
    {
      $skip: (Number(page) - 1) * Number(limit),
    },
    {
      $limit: Number(limit),
    },
  ])

  if (!quote) {
    return res.status(404).send('Quote not found')
  }

  return res.status(200).json(quote)
}

export const getSingleQuoteHandler = async (req: Request, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.movieId)

  if (!isValid) {
    return res.status(422).send('Invalid id')
  }

  await Quote.find(
    {
      movieId: req.params.movieId,
      userId: req.params.userId,
    },
    (err: any, quote: any) => {
      if (err) {
        return res.status(500).send(err)
      }
      return res.status(200).json(quote)
    }
  )
}

export const deleteQuoteHandler = async (req: Request, res: Response) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.quoteId)

  if (!isValid) {
    return res.status(422).send('Invalid id')
  }

  const quote = await Quote.findByIdAndDelete(req.params.quoteId)

  if (!quote) {
    return res.status(404).send('Quote not found')
  }

  return res.status(200).json(quote)
}
