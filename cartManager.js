import fs from "fs"
import { productManager } from './app.js';

export class CartManager {
    constructor () {
    this.path = "./carts.json";
    };

    getCarts(){
        try {
            const data = fs.readFileSync(this.path, "utf8");
            this.carts = JSON.parse(data);
            return this.carts;      
        } catch (error) {
            console.error(error);
            return []; 
        }
    };


    addCart() { 
        this.getCarts()
        const newCart = {
            id: this.carts.length + 1,
            products: []
        };

        this.carts.push(newCart);

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
            console.log("Guardado");
            return newCart;
                
        } catch (error) {
            console.error(error)     
        }
    };

    getCartById(cartId){
        this.getCarts()
        const cart = this.carts.find (c => c.id === cartId);
        console.log(cart);
        if (cart) {
            return cart;
        } else {
            console.log("No se encontró el carrito");
            return null;
        }    
    };

    addProduct(cartId, productId) {
        try {
            this.getCarts();
            const cart = this.carts.find(c => c.id === cartId);

            if (!cart) {
                throw new Error(`No se encuentra el carrito de id : ${cartId}`);
            }

            const existingProduct = cart.products.find(p => p.id === parseInt(productId));

            if (!existingProduct) {
                const product = productManager.getProductById(productId);

                if (!product) {
                    throw new Error(`No se encuentra el producto de id : ${productId}`);
                }

                cart.products.push({
                    id: parseInt(productId),
                    quantity: 1
                });
            } else {
                existingProduct.quantity++;
            }

            fs.writeFileSync(this.path, JSON.stringify(this.carts));
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    deleteProduct(cartId, productId) {

        try {
            this.getCarts();
            const cart = this.carts.find(cart => cart.id === cartId);

            if (!cart) {
                throw new Error(`No se encontró el carrito`);
            }

            const productIndex = cart.products.findIndex(product => product.id === parseInt(productId));

            if (productIndex === -1) {
                throw new Error(`No existe producto con id : ${productId} en el carrito con id : ${cartId}`);
            }

            const product = cart.products[productIndex];

            if (product.quantity > 1) {
                product.quantity--;
            } else {
                cart.products.splice(productIndex, 1);
            }

            fs.writeFileSync(this.path, JSON.stringify(this.carts));
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}



