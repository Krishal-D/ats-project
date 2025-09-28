import express from 'express'
import {
    getUsers,
    getUserById,
    updateUsers,
    deleteUsers
} from '../controllers/userController.js'




const router = express.Router()

router.get("/", getUsers)
router.get("/:id",getUserById)
router.put("/:id",updateUsers)
router.delete("/:id",deleteUsers)


export default router