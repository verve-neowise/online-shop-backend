import { Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs' 
import userStorage from "../storage/user.storage";
import { JwtData } from "../security/jwt.data";

const router = Router()

router.get('/', (req, res) => {

    let error = req.session.error
    req.session.error = undefined
    res.render('login', { error })
})

router.post('/', async (req, res) => {
    let { username, password } = req.body

    let user = await userStorage.findUser(username)

    if (user && bcrypt.compareSync(password, user.password)) {
        
        let data: JwtData = { userId: user.id, role: user.role, username: username }
        req.session.token = jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: '1h' })

        res.redirect('/admin')
    }
    else {
        req.session.error = "User or password wrong!"
        res.redirect('/auth')
    }
})

export default router