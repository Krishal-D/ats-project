import { pool } from "../config/db.js"

export const findAllApplication = async () => {
    const result = await pool.query(`
    SELECT 
    u.name as user_name,
    u.email as user_email,
    j.title as job_title,
    a.id as applicant_id,
    a.created_at,
    a.status
    FROM applications a
    JOIN users u ON a.user_id=u.id
    JOIN jobs j ON a.job_id=j.id
    ORDER BY a.id ASC
    `)

    return result.rows
}




export const findApplicationById = async (id) => {

    const result = await pool.query(`
        SELECT 
        a.id as applicant_id,
        u.name as user_name,
        j.title as job_title,
        u.email as user_email,
        a.status
        FROM applications a
        JOIN users u ON a.user_id=u.id
        JOIN jobs j ON a.job_id=j.id
        WHERE a.id=$1`
        , [id])
    return result.rows[0]
}

export const createApplication = async (user_id, job_id, status, cover_letter, resume_path) => {

    const userCheck = await pool.query(`SELECT id FROM users WHERE id=$1`, [user_id])
    const jobCheck = await pool.query(`SELECT id FROM jobs WHERE id=$1`, [job_id])

    if (userCheck.rows.length === 0) {
        throw new Error("User Not found")
    }

    if (jobCheck.rows.length === 0) {
        throw new Error("Job Not found")
    }


    const result = await pool.query(`
        INSERT INTO applications (user_id,job_id,status,cover_letter,resume_path) VALUES ($1,$2,$3,$4,$5) RETURNING *
    `, [user_id, job_id, status, cover_letter, resume_path])

    return result.rows[0]
}

export const deleteApplication = async (id) => {
    const result = await pool.query(`
        DELETE from applications WHERE id=$1 RETURNING *
    `, [id])

    return result.rows[0]
}


export const updateApplicationStatus = async (status, id) => {
    const result = await pool.query(`
        UPDATE applications SET status=$1 WHERE id=$2 RETURNING *
    `, [status, id])

    return result.rows[0]
}

export const updateResume = async (resume_path, id) => {
    const result = await pool.query(`
        UPDATE applications SET resume_path=$1 WHERE id=$2 RETURNING *
    `, [resume_path, id])

    return result.rows[0]
}


export const findApplicationByUserId = async (user_id) => {
    const result = await pool.query(`
        SELECT 
        a.id as applicant_id,
        u.name as user_name,
        u.email as user_email,
        j.title as job_title,
        j.company,
        a.status,
        a.created_at
        FROM applications a
        LEFT JOIN users u ON a.user_id = u.id
        LEFT JOIN jobs j ON a.job_id = j.id
        WHERE a.user_id = $1
        ORDER BY a.created_at DESC
    `, [user_id])

    return result.rows
}

export const findUserByJobId = async (job_id) => {
    const result = await pool.query(`
        SELECT 
        a.id as applicant_id,
        u.name as user_name,
        u.email as user_email,
        j.title as job_title,
        j.company,
        a.status,
        a.created_at
        FROM applications a
        LEFT JOIN users u ON a.user_id = u.id
        LEFT JOIN jobs j ON a.job_id = j.id
        WHERE a.job_id = $1
        ORDER BY a.created_at DESC
    `, [job_id])

    return result.rows
}