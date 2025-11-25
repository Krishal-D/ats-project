import { verifyAccessToken } from "../config/auth.js";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' })
        }

        const parts = authHeader.split(' ')
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Invalid authorization header format' })
        }
        const token = parts[1]
        req.user = verifyAccessToken(token)
        next()

    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}


export const authorizeRoles = (...roles) => (req, res, next) => {

    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authorized user' })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        next()
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });

    }

}