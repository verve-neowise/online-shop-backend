export default class Product {

     id: number
     mid: number
     name: string
     photo: string
     price: number

    constructor(
        id: number,
        mid: number,
        name: string,
        photo: string,
        price: number
    ) {
        this.id = id
        this.mid = mid
        this.name = name
        this.photo = photo
        this.price = price
    }
}