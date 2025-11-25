import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
import { errorHandler } from './middleware/errorHandling.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

// Fail fast if required secrets are missing
const requiredEnv = ['JWT_SECRET', 'JWT_REFRESH_SECRET']
const missing = requiredEnv.filter((k) => !process.env[k] || process.env[k].trim() === '')
if (missing.length) {
  console.error('Missing required environment variables:', missing.join(', '))
  process.exit(1)
}

const PORT = process.env.PORT || 5000

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/uploads', express.static('uploads'));


app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`)
})
