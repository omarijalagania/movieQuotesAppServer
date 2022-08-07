import express from 'express'
import {
  addMovieHandler,
  getAllMoviesHandler,
  getSingleMovieHandler,
} from 'controllers'

const router = express.Router()

router.post('/add', addMovieHandler)
router.get('/all', getAllMoviesHandler)
router.get('/:id', getSingleMovieHandler)

export default router
