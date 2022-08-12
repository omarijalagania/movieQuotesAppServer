import express from 'express'
import { getSingleQuoteHandler } from 'controllers'

const router = express.Router()

router.get('get/:id', getSingleQuoteHandler)

export default router
