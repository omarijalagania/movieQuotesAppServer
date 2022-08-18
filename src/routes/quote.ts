import express from 'express'
import { addQuoteHandler, editQuoteHandler } from 'controllers'

const router = express.Router()

router.post('/add', addQuoteHandler)
router.put('/update/:id', editQuoteHandler)

export default router
