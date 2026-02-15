import { userMigrate, down as userDown } from './migration/001_userMigrate.js'
import { jobMigrate, down as jobDown } from './migration/002_jobMigrate.js'
import { applicationMigrate, down as applicationDown } from './migration/003_applicationMigrate.js'
import { pool } from './config/db.js'

async function runMigrations(direction) {
  try {
    if (direction === 'up') {
      await userMigrate(pool)
      await jobMigrate(pool)
      await applicationMigrate(pool)
    } else if (direction === 'down') {
      await applicationDown(pool)
      await jobDown(pool)
      await userDown(pool)

    } else {
      console.error("Please provide 'up' or 'down' as an argument.")
      return
    }
    console.log('Migrations completed!')
  } catch (err) {
    console.error('Migration error:', err.message)
  } finally {
    await pool.end()
  }
}

const direction = process.argv[2]
runMigrations(direction)
