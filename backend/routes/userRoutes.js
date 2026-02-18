import express from 'express'
import {
  getUsers,
  getUserById,
  updateUsers,
  deleteUsers,
  getMyProfile,
  updateMyProfile,
} from '../controllers/userController.js'

import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'
import profileUpload from '../middleware/profileUpload.js'

const router = express.Router()

router.get('/', authenticate, authorizeRoles('admin'), getUsers)
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteUsers)

router.get('/profile', authenticate, getMyProfile)
router.put('/profile', authenticate, profileUpload.single('profile_pic'), updateMyProfile)

router.get('/:id', authenticate, getUserById)
router.put('/:id', authenticate, updateUsers)

export default router
