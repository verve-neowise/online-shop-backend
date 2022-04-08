import { Router } from "express";
import cartStorage from "../storage/cart.storage";
import magazineStorage from "../storage/magazine.storage";
import productStorage from "../storage/product.storage";

const router = Router()

router.get('/magazines', async (req, res) => {
    let magazines = await magazineStorage.allMagazines()
    res.send(magazines)
})

router.get('/products/:id', async (req, res) => {
    let products = await productStorage.findProducts(req.params.id)
    res.send(products)
})

router.get('/cart', async (req, res) => {
    let items = await cartStorage.allItems(req.payload.userId)
    res.send(items)
})

router.post('/cart', async (req, res) => {
    let userId = req.payload.userId
    let { product_id } = req.body
    console.log(userId, product_id);
    await cartStorage.addItem(userId.toString(), product_id)
    console.log("add item");
    res.status(200).send({
        error: null,
        message: 'Item added to cart'
    })
})

export default router