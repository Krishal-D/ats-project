import express from 'express'

import {
  getJobs,
  getJobsById,
  registerJobs,
  updateJobs,
  deleteJobs,
  getJobsByRecruiterId
} from '../controllers/jobController.js'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getJobs)
router.get('/myjobs', authenticate, authorizeRoles('employer'), getJobsByRecruiterId)
router.get('/:id', getJobsById)
router.post('/', authenticate, authorizeRoles('employer'), registerJobs)
router.put('/:id', authenticate, authorizeRoles('employer'), updateJobs)
router.delete('/:id', authenticate, authorizeRoles('employer'), deleteJobs)

export default router
