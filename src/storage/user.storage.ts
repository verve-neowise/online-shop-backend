import User from "../model/user.model";
import storage from "./storage";
import bcrypt from 'bcryptjs'


async function addUser(user: User) {

    let query = 'INSERT INTO users (username, password, name, surname, role) values($1, $2, $3, $4, $5)'
    let hashedPassword = bcrypt.hashSync(user.password, 10)

    await storage.run(query, [
        user.username,
        hashedPassword,
        user.name,
        user.surname,
        user.role
    ])
}

async function findUser(username: string): Promise<User> {
    let query = 'SELECT * FROM users WHERE username = $1'
    let data = await storage.get(query, [username])
    return mapUser(data)!
}

async function allUsers() {
    let query = 'SELECT * FROM users'
    let datas = await storage.all(query)
    return datas.map(mapUser)
}

function mapUser(data: any): User | undefined {
    return data ? new User(
        data.id,
        data.username,
        data.password,
        data.name,
        data.surname,
        data.role
    ) : undefined
}

export default {
    addUser,
    findUser,
    allUsers
}