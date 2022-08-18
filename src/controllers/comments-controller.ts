import { Request, Response } from 'express'
import { Comment } from 'models'
import { validateComment } from 'schema'

export const addCommentHandler = async (req: Request, res: Response) => {
  const { error } = validateComment(req.body)

  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const data = {
    comment: req.body.comment,
    quoteId: req.body.quoteId,
    userId: req.body.userId,
  }

  const quote = await Comment.create(data)

  return res.status(200).json(quote)
}
