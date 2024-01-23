import express from 'express'
const routerP = express.Router()
import { productManager } from '../app.js'




routerP.get('/api/products',async (req,resp)=>{
    try {
        const limit = parseInt(req.query.limit)
        const products = await productManager.getProducts()
        if (!isNaN(limit) && limit > 0) {
            const productsMostrar = products.slice(0, limit)
            resp.json(productsMostrar)
        } else {
            resp.json(products)
        }
    } catch (error) {
        resp.status(500).json({ error: error.message })
    }
})

routerP.get('/:pid', async (req, resp) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id)
        resp.json( { status: 'success', payload: product })
    } catch (error) {
        resp.status(500).json({ error: error.message })
    }
});

routerP.post('/', async (req, resp) => {
    try {
        const product = req.body
        const newProduct = await productManager.addProduct(product)
        
        resp.json( { status: 'success', payload: newProduct })
    } catch (error) {
        resp.status(500).json({ error: error.message })
    }
})

routerP.put('/:pid', async (req, resp) => {
    try {
        const id = parseInt(req.params.pid)
        const product = req.body
        const updatedProduct = await productManager.updateProduct(id, product)
        resp.json( { status: 'success', payload: updatedProduct })
    } catch (error) {
        resp.status(500).json({ error: error.message })
    }
})

routerP.delete('/:pid', async (req, resp) => {
    try {
        const id = parseInt(req.params.pid)
        const deletedProduct = await productManager.deleteProduct(id)
        resp.json( { status: 'success', payload: deletedProduct })
    } catch (error) {
        resp.status(500).json({ error: error.message })
    }
})



export default routerP