import express from 'express'
import {
  googleLogin,
  userConfirm,
  userLogin,
  userRegister,
  userPasswordRecoverEMail,
  newUserPassword,
  getUser,
  getUserById,
  googleUserUpdate,
  updateRegularUserHandler,
} from 'controllers'
import { upload } from 'utils'

const router = express.Router()

router.post('/register', userRegister)
router.post('/register/google', googleLogin)
router.post('/login', userLogin)
router.post('/confirm', userConfirm)
router.post('/password/recover', userPasswordRecoverEMail)
router.post('/password/new', newUserPassword)
router.post('/get', getUser)
router.get('/get/:userId', getUserById)
router.put('/update/:userId', upload.single('poster'), googleUserUpdate)
router.put(
  '/update/regular/:userId',
  upload.single('poster'),
  updateRegularUserHandler
)

export default router
