import { pool } from "../config/db.js";

export const findAllJobs = async () => {
    const result = await pool.query(`SELECT * FROM jobs`)
    return result.rows
}

export const findJobById = async (id) => {
    const result = await pool.query(`SELECT * FROM jobs WHERE id=$1`, [id])
    return result.rows[0]
}

export const createJobs = async (title, description, location, salary, created_at) => {
    const result = await pool.query(`INSERT INTO jobs (title, description,location, salary, created_at) VALUES ($1,$2,$3,$4,$5) RETURNING * `, [title, description, location, salary, created_at])
    return result.rows[0]
}

export const editJobs = async (title, description, location, salary, created_at,id) => {
    const result = await pool.query(`UPDATE jobs SET title=$1,description=$2, location=$3,salary=$4,created_at=$5 WHERE id=$6 RETURNING *`, [title, description, location, salary, created_at, id])
    return result.rows[0]
}

export const removeJobs = async (id) => {
    const result = await pool.query(`DELETE FROM jobs WHERE id=$1 RETURNING *`, [id])
    return result.rows[0]
}