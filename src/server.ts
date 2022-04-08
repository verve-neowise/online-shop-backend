import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(__dirname, '../.env')
})

import cors from 'cors'
import express from 'express'
import { engine } from 'express-handlebars'
import session from 'express-session'
import cookieParser from 'cookie-parser'

// Routers
import authRoute from './routes/auth.route'
import usersRoute from './routes/users.route'
import adminRoute from './routes/admin.route'
import apiRoute from './routes/api.route'

import authMiddleware from './security/auth.middleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET!,
    proxy: true,
    resave: true,
    saveUninitialized: true
}))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './pages')

app.use(authMiddleware)

app.use('/auth', authRoute)
app.use('/', usersRoute)
app.use('/admin', adminRoute)
app.use('/api', apiRoute)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})