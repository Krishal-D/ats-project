import {
  findUserById,
  createUser,
  editUser,
  removeUser,
  findAllUsers,
} from '../models/userModel.js'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const getUsers = async (req, res, next) => {
  try {
    const users = await findAllUsers()
    const data = users.map(({ id, name, email }) => ({ id, name, email }))
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const users = await findUserById(id)

    if (!users) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ id: users.id, name: users.name, email: users.email })
  } catch (err) {
    next(err)
  }
}

export const registerUsers = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const users = await createUser(name, email, hashedPassword)
    res.status(201).json({ id: users.id, name: users.name, email: users.email })
  } catch (err) {
    next(err)
  }
}

export const updateUsers = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, email, password } = req.body
    const hashedPassword = password
      ? await bcrypt.hash(password, SALT_ROUNDS)
      : oldUser.password
    const users = await editUser(name, email, hashedPassword, id)
    res.status(200).json({ id: users.id, name: users.name, email: users.email })
  } catch (err) {
    next(err)
  }
}

export const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params

    const users = await removeUser(id)

    if (!users) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ id: users.id, name: users.name, email: users.email })
  } catch (err) {
    next(err)
  }
}
