import { pool } from "../config/db.js";


async function jobMigrate() {
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

    } finally {
        pool.end()
    }
}

jobMigrate()