import express from 'express'
import { addMovieHandler } from 'controllers'

const router = express.Router()

router.post('/add', addMovieHandler)

export default router
