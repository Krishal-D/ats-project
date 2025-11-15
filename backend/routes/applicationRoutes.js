import express from 'express'
import { getApplication, getApplicationById, registerApplication, editApplication, removeApplication } from '../controllers/applicationController.js'


const router = express.Router()

router.get("/", getApplication)
router.get("/:id", getApplicationById)
router.post("/", registerApplication)
router.post("/:id", editApplication)
router.delete("/:id", removeApplication)

export default router

