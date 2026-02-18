import { pool } from '../config/db.js'

export const findAllJobs = async () => {
  const result = await pool.query(`SELECT * FROM jobs`)
  return result.rows
}

export const findJobById = async (id) => {
  const result = await pool.query(`SELECT * FROM jobs WHERE id=$1`, [id])
  return result.rows[0]
}

export const findJobsByRecruiterId = async (recruiter_id) => {
  const result = await pool.query(`SELECT * FROM jobs WHERE recruiter_id = $1  `, [recruiter_id])
  return result.rows
}

export const createJobs = async (
  title,
  company,
  description,
  location,
  salary,
  job_type,
  tech_stack,
  requirements,
  responsibility,
  benefits,
  recruiter_id
) => {
  const result = await pool.query(
    `INSERT INTO jobs (title,company, description, location, salary, job_type, tech_stack,requirements,responsibility,benefits,recruiter_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11) RETURNING *`,
    [
      title,
      company,
      description,
      location,
      salary,
      job_type,
      tech_stack,
      requirements,
      responsibility,
      benefits,
      recruiter_id,
    ]
  )
  return result.rows[0]
}
export const editJobs = async (
  title,
  company,
  description,
  location,
  salary,
  job_type,
  tech_stack,
  requirements,
  responsibility,
  benefits,
  id
) => {
  const result = await pool.query(
    `UPDATE jobs
         SET title=$1,company=$2, description=$3, location=$4, salary=$5, job_type=$6, tech_stack=$7,requirements=$8,responsibility=$9,benefits=$10
         WHERE id=$11 RETURNING *`,
    [
      title,
      company,
      description,
      location,
      salary,
      job_type,
      tech_stack,
      requirements,
      responsibility,
      benefits,
      id,
    ]
  )
  return result.rows[0]
}

export const removeJobs = async (id) => {
  const result = await pool.query(`DELETE FROM jobs WHERE id=$1 RETURNING *`, [id])
  return result.rows[0]
}
