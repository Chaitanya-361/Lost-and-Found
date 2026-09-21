import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')

import userRoutes from './routes/userRoutes.js'
import ItemRoutes from './routes/ItemRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'Lost and Found API is running smoothly' })
})
app.use('/users', userRoutes)
app.use(['/items', '/Items'], ItemRoutes)

const port = process.env.PORT || 4000
const db = process.env.DB || 'mongodb://127.0.0.1:27017/lost-found-mern'

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(port, () =>
            console.log('Database connection successful, running on PORT: ' + port)
        )
    )
    .catch((err) => console.log(err.message))


