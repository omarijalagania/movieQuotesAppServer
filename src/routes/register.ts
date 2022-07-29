import express from 'express'
import { userConfirm, userRegister } from 'controllers'

const router = express.Router()

router.post('/register', userRegister)
router.get('/confirm/:token', userConfirm)

export default router
