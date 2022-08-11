import express from 'express'
import { addQuoteHandler } from 'controllers'

const router = express.Router()

router.post('/add', addQuoteHandler)

export default router
