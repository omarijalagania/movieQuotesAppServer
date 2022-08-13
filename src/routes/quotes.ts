import express from 'express'
import { getQuoteHandler } from 'controllers'

const router = express.Router()

router.get('/get', getQuoteHandler)

export default router
