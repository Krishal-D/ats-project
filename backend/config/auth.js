import jwt from 'jsonwebtoken'
import { checkRefreshToken } from '../models/userModel.js'

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' })
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export const verifyRefreshToken = async (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

        const user = await checkRefreshToken(payload.id, token)
        if (!user) {
            throw new Error('Refresh token not found or revoked')
        }

        return user
    } catch (err) {
        throw new Error('Invalid or expired refresh token')
    }
}