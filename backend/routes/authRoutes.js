import express from 'express'
import { registerUsers } from '../controllers/userController.js'
import { loginUsers, refreshToken, logOutUsers, currentUser } from '../controllers/userLogin.js'
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUsers)
router.post('/login', loginUsers)
router.post('/refresh', refreshToken)
router.post('/logout', logOutUsers)
router.get('/me', authenticate, currentUser)


export default router
