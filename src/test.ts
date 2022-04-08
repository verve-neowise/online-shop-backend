import dotenv from 'dotenv'
import path from 'path'
import User, { Role } from './model/user.model';

dotenv.config({
    path: path.join(__dirname, '../.env')
})

import userStorage from "./storage/user.storage";

async function main() {

    // await userStorage.addUser(
    //     new User(-1, 'admin', '1234', 'Admin', '', Role.Admin)
    // )

    console.log(await userStorage.allUsers());
}

main()