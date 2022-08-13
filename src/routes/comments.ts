import express from 'express'
import { addCommentHandler } from 'controllers'

const router = express.Router()

router.post('/add', addCommentHandler)

export default router
