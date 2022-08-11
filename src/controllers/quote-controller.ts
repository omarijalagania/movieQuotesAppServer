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

  const data = {
    quoteNameEng: req.body.quoteNameEng,
    quoteNameGe: req.body.quoteNameGe,
    movieId: req.body.movieId,
    userId: req.body.userId,
    poster: poster,
  }

  const quote = await Quote.findByIdAndUpdate(req.params.id, data, {
    new: true,
  })

  return res.status(200).json(quote)
}
