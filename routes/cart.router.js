import express from 'express'
const routerC = express.Router()
import { cartManager } from '../app.js'

routerC.post('/', async (req, resp) => {
  try {
      const newCart = await cartManager.addCart();
      resp.json( { status: 'success', payload: newCart })
  } catch (error) {
      resp.status(500).json({ error: error.message })
  }
})

routerC.get("/:cid", async (req, resp) => {
  try {
      const id = parseInt(req.params.cid)
      const cart = await cartManager.getCartById(id)
      resp.json( { status: 'success', payload: cart })
  } catch (error) {
      resp.status(500).json({ error: error.message })
  }
})

routerC.post('/:cid/product/:pid', async (req, resp) => {
  try {
      const cartId = parseInt(req.params.cid)
      const productId = parseInt(req.params.pid)
      const cart = await cartManager.addProduct(cartId, productId)
      resp.json( { status: 'success', payload: cart })
  } catch (error) {
      resp.status(500).json({ error: error.message })
  }
})

routerC.delete('/:cid/product/:pid', async (req, resp) => {
  try {
      const cartId = parseInt(req.params.cid)
      const productId = parseInt(req.params.pid)
      const cart = await cartManager.deleteProduct(cartId, productId)
      resp.json( { status: 'success', payload: cart })
  } catch (error) {
      resp.status(500).json({ error: error.message })
  }
})



export default  routerC