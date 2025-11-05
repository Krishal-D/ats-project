export async function userMigrate(pool) {
  try {
    await pool.query(`  
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            name VARCHAR(100) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )
        `)
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

export async function down(pool) {
  try {
    await pool.query(`DROP TABLE IF EXISTS users`)
    console.log('User table dropped')
  } catch (err) {
    console.error('User rollback failed:', err.message)
    throw err
  }
}
