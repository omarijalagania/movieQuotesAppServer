import express from 'express'
import { getQuoteHandler, getSingleQuoteHandler } from 'controllers'

const router = express.Router()

router.get('/get', getQuoteHandler)
router.get('/get/:movieId/:userId', getSingleQuoteHandler)

export default router
