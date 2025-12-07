import express from 'express'
import upload from '../middleware/upload.js'
import { getApplication, getApplicationById, registerApplication, editApplicationStatus, editResume, removeApplication, getApplicationByUserId, getUserByJobId } from '../controllers/applicationController.js'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'


const router = express.Router()

router.get("/", authenticate, authorizeRoles('employer'), getApplication)
router.get("/myapplication", authenticate, authorizeRoles('candidate'), getApplicationByUserId)
router.get("/mycandidates/:job_id", authenticate, authorizeRoles('employer'), getUserByJobId)

router.get("/:id", authenticate, authorizeRoles('employer'), getApplicationById)

router.post("/", authenticate, authorizeRoles('candidate'), upload.single('resume'), registerApplication)

router.put("/:id/resume", authenticate, authorizeRoles('candidate'), upload.single('resume'), editResume)
router.put("/:id/status", authenticate, authorizeRoles('employer'), editApplicationStatus)
router.delete("/:id", authenticate, authorizeRoles('candidate'), removeApplication)

export default router

