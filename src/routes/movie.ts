import express from 'express'
import { addMovieHandler, getAllMoviesHandler } from 'controllers'

const router = express.Router()

router.post('/add', addMovieHandler)
router.get('/all', getAllMoviesHandler)

export default router
