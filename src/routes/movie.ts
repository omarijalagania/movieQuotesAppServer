import express from 'express'
import { addMovieHandler, updateMovieHandler } from 'controllers'

const router = express.Router()

router.post('/add', addMovieHandler)
router.put('/update/:id', updateMovieHandler)

export default router
