import express from 'express'
import { registerUsers } from '../controllers/userController.js'
import { loginUsers, refreshToken, logOutUsers } from '../controllers/userLogin.js'
import { authRateLimit } from '../middleware/authRateLimit.js'

const router = express.Router()

router.post('/register', authRateLimit, registerUsers)
router.post('/login', authRateLimit, loginUsers)
router.post('/refresh', refreshToken)
router.post('/logout', logOutUsers)

export default router
