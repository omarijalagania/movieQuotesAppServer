import { Request, Response } from 'express'
import { Genre } from 'models'

export const getGenres = async (_: Request, res: Response) => {
  try {
    const genres = await Genre.find({})

    if (!genres) {
      return res.status(404).send('Genres not found')
    }
    return res.status(200).json(genres)
  } catch (error) {
    return res.status(500).send('Server wrong error')
  }
}
