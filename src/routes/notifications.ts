import express from 'express'
import { addNotificationHandler, getNotificationHandler } from 'controllers'

const router = express.Router()

router.post('/add', addNotificationHandler)
router.get('/get', getNotificationHandler)

export default router
