export default class Magazine {
    readonly id: number
    readonly name: string
    readonly category: string
    readonly color: string

    constructor(
        id: number,
        name: string,
        category: string,
        color: string
    ) {
        this.id = id
        this.name = name
        this.category = category
        this.color = color
    }
}

