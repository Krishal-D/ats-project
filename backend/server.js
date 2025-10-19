import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import { errorHandler } from './middleware/errorHandling.js'
import authRoutes from './routes/authRoutes.js'
import cors from "cors"

const PORT = process.env.PORT || 5000

dotenv.config()

const app = express()

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));




app.use(express.json())





app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/job",jobRoutes)


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`)
})