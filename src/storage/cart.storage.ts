import storage from "./storage";
import Product from "../model/product.model";

async function addItem(userId: string, productId: string) {

    let query = 'INSERT INTO carts (user_id, product_id) values($1, $2)'

    await storage.run(query, [
        userId, productId
    ])
}

async function allItems(userId: number) {
    let query = `SELECT
                     products.id as id, products.mid as mid,
                     products.name as name, products.photo as photo,
                     products.price as price, magazines.name as magazine
                FROM products
                INNER JOIN magazines ON magazines.id = products.mid
                LEFT JOIN carts ON products.id = carts.product_id
                WHERE carts.user_id = $1`
                
    let datas = await storage.all(query, [userId])
    return datas.map(mapProduct)
}

function mapProduct(data: any) {
    return data ? new Product(
        data.id,
        data.mid,
        data.name,
        data.photo,
        data.price,
        data.magazine
    ) : undefined
}

export default {
    addItem,
    allItems
}