import express from 'express'
import productRoutes from './routes/products.router.js'
import {ProductManager} from './productManager.js'
import { CartManager } from './cartManager.js'
import {routerP} from './routes/products.router.js'
import {routerC} from './routes/cart.router.js'
import path from 'path'
const app = express()
const puerto = 8080




app.use('/', productRoutes)
app.use(express.urlencoded({ extended: true }))
const pathProducts = './src/data/products.json'
const pathCarts = './src/data/carts.json'

export const productManager = new ProductManager(pathProducts)
export const cartManager = new CartManager(pathCarts)

app.use('/api/products', routerP)
app.use('/api/carts', routerC)

app.listen(puerto,()=>{
   console.log(`Servidor corriendo en el puerto ${puerto}`) 
})

