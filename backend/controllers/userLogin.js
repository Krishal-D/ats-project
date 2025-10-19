import bcrypt from 'bcrypt'
import { siginUser } from '../models/userModel.js'

export const loginUsers = async (req, res, next) => {

    try {
        const { email, password } = req.body


        const users = await siginUser(email)

        if (!users) {
            return res.status(404).json({ error: "User not found" })
        }

        const passwordCheck = await bcrypt.compare(password, users.password)

        if (!passwordCheck) {
            return res.status(401).json({ error: "Incorrect password" })
        }

        res.json({ id: users.id, name: users.name, email: users.email })

    } catch (err) {
        next(err)
    }
}