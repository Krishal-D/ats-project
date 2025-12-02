import bcrypt from 'bcrypt'
import { siginUser } from '../models/userModel.js'
import { setRefreshToken, removeRefreshToken } from '../models/userModel.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../config/auth.js'
import { findUserById } from '../models/userModel.js'


export const loginUsers = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const users = await siginUser(email)

    if (!users) {
      return res.status(404).json({ error: 'User not found' })
    }

    const passwordCheck = await bcrypt.compare(password, users.password)

    if (!passwordCheck) {
      return res.status(401).json({ error: 'Incorrect password' })
    }

    const accessToken = generateAccessToken(users)
    const refreshToken = generateRefreshToken(users)

    await setRefreshToken(refreshToken, users.id)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({
      token: accessToken,
      user: { id: users.id, name: users.name, email: users.email, role: users.role }
    })
  } catch (err) {
    next(err)
  }
}


export const logOutUsers = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken

    if (token) {
      try {
        const user = await verifyRefreshToken(token)
        if (user?.id) {
          await removeRefreshToken(user.id)
        }
      } catch (_) {
      }
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    })

    res.status(200).json({ message: 'Logged out successfully' })

  } catch (err) {
    next(err)
  }
}


export const refreshToken = async (req, res, next) => {
  try {

    const token = req.cookies?.refreshToken || req.body?.refreshToken
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const users = await verifyRefreshToken(token)
    if (!users) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const newAccessToken = generateAccessToken(users)
    const newRefreshToken = generateRefreshToken(users)

    await setRefreshToken(newRefreshToken, users.id)

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({
      token: newAccessToken,
      user: { id: users.id, name: users.name, email: users.email, role: users.role }
    })


  } catch (err) {
    next(err)
  }
}