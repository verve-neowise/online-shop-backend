import storage from "./storage";
import Product from "../model/product.model";

async function addProduct(product: Product) {

    let query = 'INSERT INTO products (mid, name, photo, price) values($1, $2, $3, $4)'

    await storage.run(query, [
        product.mid,
        product.name,
        product.photo,
        product.price
    ])
}

async function findProducts(mid: string) {
    let query = `SELECT
                     products.id as id, products.mid as mid,
                     products.name as name, products.photo as photo,
                     products.price as price, magazines.name as magazine
                FROM products INNER JOIN magazines ON magazines.id = products.mid
                WHERE mid = $1`
                
    let datas = await storage.all(query, [mid])
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
    addProduct,
    findProducts
}