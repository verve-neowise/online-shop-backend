import { Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userStorage from "../storage/user.storage";
import { JwtData } from "../security/jwt.data";
import User from "../model/user.model";

const router = Router()

router.post('/login', async (req, res) => {

    let { username, password } = req.body

    let user = await userStorage.findUser(username)

    if (user && bcrypt.compareSync(password, user.password)) {

        let data: JwtData = { 
            userId: user.id,
            role: user.role,
            username: username 
        }

        let token = jwt.sign(data, process.env.JWT_SECRET!, {
             expiresIn: '1h'
        })

        res.status(200).send({
            error: null,
            token
        })
    }
    else {
        res.status(401).send({
            error: 'Unauthorized',
            token: null
        })
    }
})

router.post('/register', async (req, res) => {
    
    let { username, password, name, surname } = req.body

    if (await userStorage.findUser(username)) {
        return res.status(403).send({
            error: 'Username already taken.',
            token: null
        })
    }

    let user = new User(0, username, password, name, surname)

    await userStorage.addUser(user)
    
    let newUser = await userStorage.findUser(username)

    let data: JwtData = {
        userId: newUser.id,
        role: newUser.role,
        username: username
    }

    let token = jwt.sign(data, process.env.JWT_SECRET!, {
        expiresIn: '1h'
    })

    res.status(200).send({
        error: null,
        token
    })  
})

export default router