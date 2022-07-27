import express from 'express'
import { userRegister } from 'controllers'

const router = express.Router()

router.post('/register', userRegister)

export default router
