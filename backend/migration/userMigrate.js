import { pool } from "../config/db.js";

async function userMigrate() {
    try {

        await pool.query(`  
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            name VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL

        )
        `)

    } catch (err) {
        console.error(err.message)
    } finally {
        pool.end()
    }
}


userMigrate()