import bcrypt from 'bcrypt'
import { pool } from '../config/db.js'

export const loginUsers = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])

        const user = result.rows[0]

        if (!user) {
           return res.status(404).json({ error: "User not found" })
        }

        const passwordCheck = await bcrypt.compare(password, user.password)

        if (!passwordCheck) {
           return res.status(401).json({ error: "Incorrect password" })
        }

        res.json({id:user.id,  name:user.name, email:user.email })

    } catch (err) {
        next(err)
    }
}