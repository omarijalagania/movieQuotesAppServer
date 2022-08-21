import express from 'express'
import {
  deleteMovieHandler,
  getAllMoviesHandler,
  getMoviesHandlerNoId,
  getSingleMovieHandler,
} from 'controllers'

const router = express.Router()

router.get('/all/:userId', getAllMoviesHandler)
router.get('/feed-movies', getMoviesHandlerNoId)
router.get('/:id', getSingleMovieHandler)
router.delete('/delete/:id', deleteMovieHandler)

export default router
