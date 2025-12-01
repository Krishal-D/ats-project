import express from 'express'
import {
  getUsers,
  getUserById,
  updateUsers,
  deleteUsers,
} from '../controllers/userController.js'

import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'

const router = express.Router()

// Admin only routes
router.get('/', authenticate, authorizeRoles("admin"), getUsers)
router.delete('/:id', authenticate, authorizeRoles("admin"), deleteUsers)

// User profile routes - users can view and update their own profiles
router.get('/:id', authenticate, getUserById)
router.put('/:id', authenticate, updateUsers)

export default router
