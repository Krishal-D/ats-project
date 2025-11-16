import express from 'express'
import upload from '../middleware/upload.js'
import { getApplication, getApplicationById, registerApplication, editApplication, removeApplication } from '../controllers/applicationController.js'


const router = express.Router()

router.get("/", getApplication)
router.get("/:id", getApplicationById)
router.post("/", upload.single('resume'), registerApplication)
router.put("/:id", upload.single('resume'), editApplication)
router.delete("/:id", removeApplication)

export default router

