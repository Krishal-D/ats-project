import { pool } from "../config/db.js";



export const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await pool.query("SELECT * FROM users WHERE id = $1 ", [id])
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createUsers = async (req, res) => {
    try {
        const { name, email } = req.body
        const result = await pool.query("INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *", [name, email])
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateUsers = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email } = req.body
        const result = await pool.query("UPDATE users SET name= $1, email =$2 WHERE id =$3 RETURNING *", [name, email, id])
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })

    }
}


export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("DELETE FROM users WHERE id =$1 RETURNING *", [id])
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}