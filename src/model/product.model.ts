export default class Product {

     id: number
     mid: number
     name: string
     photo: string
     price: number
     magazine: string

    constructor(
        id: number,
        mid: number,
        name: string,
        photo: string,
        price: number,
        magazine: string,
    ) {
        this.id = id
        this.mid = mid
        this.name = name
        this.photo = photo
        this.price = price
        this.magazine = magazine
    }
}