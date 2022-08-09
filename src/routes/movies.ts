import express from 'express'
import {
  deleteMovieHandler,
  getAllMoviesHandler,
  getSingleMovieHandler,
  updateMovieHandler,
} from 'controllers'

const router = express.Router()

router.get('/all/:userId', getAllMoviesHandler)
router.get('/:id', getSingleMovieHandler)
router.put('/update/:id', updateMovieHandler)
router.delete('/delete/:id', deleteMovieHandler)

export default router
