import express from 'express'
import { registerUsers } from '../controllers/userController.js'
import { loginUsers } from '../controllers/userLogin.js'

const router = express.Router()

router.post("/register",registerUsers)
router.post("/login",loginUsers)

export default router

