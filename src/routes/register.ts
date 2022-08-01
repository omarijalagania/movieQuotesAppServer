import express from 'express'
import { googleLogin, userConfirm, userLogin, userRegister } from 'controllers'

const router = express.Router()

router.post('/register', userRegister)
router.post('/register/google', googleLogin)
router.post('/login', userLogin)
router.post('/confirm', userConfirm)

export default router
