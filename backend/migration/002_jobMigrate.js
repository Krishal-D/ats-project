
export async function jobMigrate(pool) {
    try {

        await pool.query(`
            CREATE TABLE  IF NOT EXISTS jobs(
            id SERIAL PRIMARY KEY,
            title varchar(200) NOT NULL,
            description varchar(400) NOT NULL,
            location varchar(200) NOT NULL,
            salary varchar(200) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        )

    } catch (err) {
        console.error("Job migration failed:", err);
    }
}

export async function down(pool) {
    try {
        await pool.query(`DROP TABLE IF EXISTS jobs`);
        console.log("Job table dropped");
    } catch (err) {
        console.error("Job rollback failed:", err.message);
        throw err;
    }
}