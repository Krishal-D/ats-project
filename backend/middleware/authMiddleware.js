import { verifyAccesstoken } from "../config/auth.js";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' })
        }

        const token = authHeader.split(' ')[1]

        req.user = verifyAccesstoken(token)
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