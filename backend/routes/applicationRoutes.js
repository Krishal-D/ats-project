import express from 'express'
import upload from '../middleware/upload.js'
import { getApplication, getApplicationById, registerApplication, editApplication, removeApplication, getApplicationByUserId } from '../controllers/applicationController.js'
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js'


const router = express.Router()

// Public routes - employers can view all applications
router.get("/", authenticate, authorizeRoles('employer'), getApplication)
router.get("/:id", authenticate, authorizeRoles('employer'), getApplicationById)

// Candidate routes - only candidates can apply for jobs
router.post("/", authenticate, authorizeRoles('candidate'), upload.single('resume'), registerApplication)

// Application management - candidates can edit their own applications
router.put("/:id", authenticate, authorizeRoles('candidate'), upload.single('resume'), editApplication)
router.delete("/:id", authenticate, authorizeRoles('candidate'), removeApplication)

// User's own applications - candidates can view their applications
router.get("/myapplication", authenticate, authorizeRoles('candidate'), getApplicationByUserId)

export default router

