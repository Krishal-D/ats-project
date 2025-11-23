export async function userMigrate(pool) {
  try {
    await pool.query(`  
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            user_email VARCHAR(100) NOT NULL UNIQUE,
            user_name VARCHAR(100) NOT NULL,
            user_password VARCHAR(255) NOT NULL,
            user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_role varchar(200) NOT NULL DEFAULT 'candidate',
            refresh_token TEXT 
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
