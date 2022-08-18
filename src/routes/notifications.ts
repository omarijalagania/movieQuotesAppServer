import express from 'express'
import {
  addNotificationHandler,
  getNotificationHandler,
  updateNotificationHandler,
} from 'controllers'

const router = express.Router()

router.post('/add', addNotificationHandler)
router.get('/get', getNotificationHandler)
router.post('/update', updateNotificationHandler)

export default router
