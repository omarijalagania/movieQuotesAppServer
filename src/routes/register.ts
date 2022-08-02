import express from 'express'
import {
  googleLogin,
  userConfirm,
  userLogin,
  userRegister,
  userPasswordRecoverEMail,
  newUserPassword,
} from 'controllers'

const router = express.Router()

router.post('/register', userRegister)
router.post('/register/google', googleLogin)
router.post('/login', userLogin)
router.post('/confirm', userConfirm)
router.post('/password/recover', userPasswordRecoverEMail)
router.post('/password/new', newUserPassword)

export default router
