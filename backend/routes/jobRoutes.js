import express from 'express'

import {
  getJobs,
  getJobsById,
  registerJobs,
  updateJobs,
  deleteJobs,
} from '../controllers/jobController.js'

const router = express.Router()

router.get('/', getJobs)
router.get('/:id', getJobsById)
router.post('/', registerJobs)
router.post('/:id', updateJobs)
router.delete('/:id', deleteJobs)

export default router
