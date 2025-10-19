import { userMigrate } from "./migration/001_userMigrate.js";
import { jobMigrate } from "./migration/002_jobMigrate.js"
import { pool } from "./config/db.js";


async function runMigrations() {
    try {
        await userMigrate(pool);
        await jobMigrate(pool);
    } catch (err) {
        next(err)
    } finally {
        await pool.end()
    }
}


runMigrations()