import express from 'express'
import { registerUsers } from '../controllers/userController.js'
import { loginUsers, refreshToken, logOutUsers } from '../controllers/userLogin.js'

const router = express.Router()

router.post('/register', registerUsers)
router.post('/login', loginUsers)
router.post('/refresh', refreshToken)
router.post('/logout', logOutUsers)

export default router
