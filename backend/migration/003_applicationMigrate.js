export async function applicationMigrate(pool) {
    try {
        await pool.query(`
            CREATE TABLE IF NOT Exists applications(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
            status TEXT DEFAULT 'pending',
            resume_path TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`)
    } catch (err) {
        console.error('Application migration failed:', err)

    }

}

export async function down(pool) {
    try {
        await pool.query(`DROP TABLE IF EXISTS applications`)
        console.log('Application table dropped')
    } catch (err) {
        console.error('Application rollback failed:', err.message)
        throw err
    }
}