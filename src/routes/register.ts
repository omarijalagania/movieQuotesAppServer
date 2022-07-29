import express from 'express'
import { googleLogin, userConfirm, userRegister } from 'controllers'

const router = express.Router()

router.post('/register', userRegister)
router.post('/register/google', googleLogin)
router.get('/confirm/:token', userConfirm)

export default router
