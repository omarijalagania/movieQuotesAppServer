import express from 'express'
import { addLikeHandler, removeLikeHandler } from 'controllers'

const router = express.Router()

router.put('/add', addLikeHandler)
router.put('/remove', removeLikeHandler)

export default router
