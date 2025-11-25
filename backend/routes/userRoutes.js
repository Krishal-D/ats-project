import express from 'express'
import {
  getUsers,
  getUserById,
  updateUsers,
  deleteUsers,
} from '../controllers/userController.js'

import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authenticate, authorizeRoles("admin"), getUsers)
router.get('/:id', authenticate, getUserById)
router.put('/:id', authenticate, updateUsers)
router.delete('/:id', authenticate, authorizeRoles("admin"), deleteUsers)

export default router
