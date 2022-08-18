import { Request, Response } from 'express'
import { Quote } from 'models'
import { validateLikes } from 'schema'

export const addLikeHandler = async (req: Request, res: Response) => {
  const { error } = validateLikes(req.body)

  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const quote = await Quote.findByIdAndUpdate(
    req.body.quoteId,
    {
      $push: {
        likes: req.body.userId,
      },
    },
    { new: true }
  )
  return res.status(200).json(quote)
}

export const removeLikeHandler = async (req: Request, res: Response) => {
  const { error } = validateLikes(req.body)

  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const quote = await Quote.findByIdAndUpdate(
    req.body.quoteId,
    {
      $pull: {
        likes: req.body.userId,
      },
    },
    { new: true }
  )
  return res.status(200).json(quote)
}
