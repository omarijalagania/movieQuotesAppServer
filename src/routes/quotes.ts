import express from 'express'
import {
  deleteQuoteHandler,
  getQuoteHandler,
  getSingleQuoteHandler,
} from 'controllers'

const router = express.Router()

router.get('/get', getQuoteHandler)
router.get('/get/:movieId/:userId', getSingleQuoteHandler)
router.delete('/delete/:quoteId', deleteQuoteHandler)

export default router
