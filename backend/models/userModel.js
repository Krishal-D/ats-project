import { pool } from "../config/db";

export const findAllUsers = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows
}

export const findUserById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0]
}

export const createUser = async (name, email, hashedPassword) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
    );
    return result.rows[0]
}

export const editUser = async (name, email, hashedPassword, id) => {

    const oldUserResult = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    const oldUser = oldUserResult.rows[0];

    if (!oldUser) {
        return res.status(404).json({ error: "User not found" });
    }

    const result = await pool.query(
        "UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING *",
        [name, email, hashedPassword, id]
    );

    return result.rows[0]
}

export const removeUser = async (id) => {

    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
    return result.rows[0]
}

export const siginUser = async (email) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
    return result.rows[0]
}