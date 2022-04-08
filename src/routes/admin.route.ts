import { Router } from "express";
import Magazine from "../model/magazine.model";
import Product from "../model/product.model";
import magazineStorage from "../storage/magazine.storage";
import productStorage from "../storage/product.storage";

const router = Router()

router.get('/', async (req, res) => {
    let magazines = await magazineStorage.allMagazines()
    res.render('admin', { magazines })
})

router.post('/magazine', async (req, res) => {
    let magazine: Magazine = req.body
    await magazineStorage.addMagazine(magazine)
    res.redirect('/admin')
})

router.get('/magazine/:id', async (req, res) => {
    let products = await productStorage.findProducts(req.params.id)
    res.render('products', { products, mid: req.params.id })
})

router.post('/product/:mid', async (req, res) => {
    let product: Product = req.body
    product.mid = +req.params.mid

    await productStorage.addProduct(product)
    res.redirect('/admin/magazine/' + req.params.mid)
})

export default router