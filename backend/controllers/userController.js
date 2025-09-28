import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const getUsers = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        const data = result.rows.map(({ id, name, email }) => ({ id, name, email }));
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
        next(err);
    }
};

export const registerUsers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );
        const newUser = result.rows[0];
        res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (err) {
        next(err);
    }
};

export const updateUsers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const oldUserResult = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        const oldUser = oldUserResult.rows[0];

        if (!oldUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = password
            ? await bcrypt.hash(password, SALT_ROUNDS)
            : oldUser.password;

        const result = await pool.query(
            "UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING *",
            [name, email, hashedPassword, id]
        );

        const updatedUser = result.rows[0];
        res.status(200).json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email });
    } catch (err) {
        next(err);
    }
};

export const deleteUsers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
        const deletedUser = result.rows[0];

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ id: deletedUser.id, name: deletedUser.name, email: deletedUser.email });
    } catch (err) {
        next(err);
    }
};
