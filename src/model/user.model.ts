export enum Role {
    User = 'user',
    Admin = 'admin'
}

export default class User {

    readonly id: number
    readonly username: string
    readonly password: string
    readonly name: string
    readonly surname: string
    readonly role: Role

    constructor(
        id: number,
        username: string,
        password: string,
        name: string,
        surname: string,
        role: Role = Role.User
    ) {
        this.id = id
        this.username = username
        this.password = password
        this.name = name
        this.surname = surname
        this.role = role
    }
}