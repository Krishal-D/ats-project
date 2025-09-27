import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorHandling.js'

const PORT = process.env.PORT || 5000

dotenv.config()

const app = express()

app.use(express.json())

app.use("/api/users", userRoutes)

app.use(errorHandler)

app.listen("5000", () => {
    console.log(`Running at ${PORT}`)
})