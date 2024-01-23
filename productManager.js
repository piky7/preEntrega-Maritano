
import fs from "fs"


export class ProductManager{
    constructor(){
        this.productos = []
        this.path = './products.json'
    }

    addProduct(title, description, price, thumbnail, code,stock){
        const productoNuevo = {
            id: this.productos.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
      
        const codigoRepetido = this.productos.findIndex(product => product.code === code)
        
        if(codigoRepetido === -1){
            this.productos.push(productoNuevo)
          
            console.log(productoNuevo)
           
            let newProductStr = JSON.stringify(this.productos, null, 2)
            fs.writeFileSync(this.path, newProductStr)
            return 'Producto agregado correctamente'
        }else{
            return "El producto ya se encuentra ingresado"
        }
        
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path)
    
            this.products = JSON.parse(data)
            
        } catch (error) {
            console.log(error)
           
        }
        return this.products
    }


    getProductById(id){
    
        const idRepetido = this.products.findIndex(e => e.id === id)
        if(idRepetido === -1){
            console.log('Producto no encontrado')
        }else{
            console.log('Procuto :');
            return (this.productos[idRepetido])
        }
    }

    async updateProduct(id, updatedFields) {
        const idBuscado = this.products.findIndex(e => e.id === id)
      
        if (idBuscado === -1) {
            console.log('No encontrado')
        } else {
            try {
             
                let productoSeleccionado = this.products[idBuscado]
               
                Object.assign(productoSeleccionado, updatedFields)
                
                const toString = JSON.stringify(this.productos, null, 2)
                
                fs.promises.writeFile(this.path, toString)
                console.log(this.productos[idBuscado])
                return 'Producto modificado'
            } catch (error) {
                console.error(error)
            }
        }
    }

    async deleteProduct(id) {
        const idRepetido = this.productos.findIndex(e => e.id === id);
    
        if (idRepetido === -1) {
            return "No encontrado";
        } else {
            this.products.splice(idRepetido, 1);
    
            try {
                
                const contenido = await fs.promises.readFile(this.path, 'utf-8')
                const data = JSON.parse(contenido)
                
                const update = data.filter(p => p.id !== id)
               
                await fs.promises.writeFile(this.path, JSON.stringify(update, null, 2))
             
                return 'Producto eliminado'
            } catch (error) {
                console.log(error)
            }
        }
    }
}


const productoUno = new ProductManager()

productoUno.addProduct('Coca cola','Gaseosa','$1000','foto','007','5')
productoUno.addProduct('Granola','Snack','$2500','foto','008','15')


