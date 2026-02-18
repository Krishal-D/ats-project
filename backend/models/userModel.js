import { pool } from '../config/db.js'

export const findAllUsers = async () => {
  const result = await pool.query('SELECT id, name, email, role, created_at FROM users')
  return result.rows
}

export const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows[0]
}

export const createUser = async (name, email, hashedPassword, role = 'candidate') => {
  const emailExists = await pool.query('SELECT email FROM users WHERE email = $1', [email])

  if (emailExists.rows.length > 0) {
    throw new Error('Email already exists')
  }

  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, role]
  )
  return result.rows[0]
}

export const editUser = async (name, email, hashedPassword, id) => {
  const oldUserResult = await pool.query('SELECT * FROM users WHERE id=$1', [id])
  const oldUser = oldUserResult.rows[0]

  if (!oldUser) {
    throw new Error('User not found')
  }

  const result = await pool.query(
    'UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING *',
    [name, email, hashedPassword, id]
  )

  return result.rows[0]
}

export const removeUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id])
  return result.rows[0]
}

export const siginUser = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
  return result.rows[0]
}

export const setRefreshToken = async (refreshToken, userId) => {
  const result = await pool.query(`UPDATE users SET refresh_token =$1 WHERE id =$2`, [
    refreshToken,
    userId,
  ])
  return result.rows[0]
}

export const removeRefreshToken = async (id) => {
  const result = await pool.query('UPDATE users SET refresh_token = NULL WHERE id = $1', [id])
  return result.rows[0]
}

export const checkRefreshToken = async (userId, refreshToken) => {
  const result = await pool.query(
    `SELECT id, name, email, role
     FROM users
     WHERE id = $1 AND refresh_token = $2`,
    [userId, refreshToken]
  )
  return result.rows[0]
}

export const updateUserProfile = async (id, profile_pic, bio, location, phone) => {
  const result = await pool.query(
    `UPDATE users 
     SET profile_pic = $1, bio = $2, location = $3, phone = $4 
     WHERE id = $5 
     RETURNING id, name, email, role, profile_pic, bio, location, phone`,
    [profile_pic, bio, location, phone, id]
  )
  return result.rows[0]
}
