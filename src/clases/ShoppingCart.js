const fs = require('fs');
const Product =  require('./Product')
const product = new Product('./src/data/productos.txt');

class ShoppingCart {
    constructor(filename) {
        this.filename = filename;
    }

    async save() {
        try {
            let shoppingCart = {};
            let content = await this.readFile();
            shoppingCart.id = this.buildId(content);
            shoppingCart.timestamp = Date.now();;
            
            content.push(shoppingCart);
            
            await this.writeFile(content);

            return shoppingCart;
        } catch (error) {
            console.error(error);
        }
    }

    async getShoppingCartById(id) {
        try {
            let content = await this.readFile();
            shoppingCart = content.filter((shoppingCart) => shoppingCart.id === id);
            return content.length == 0 ? null : shoppingCart;
        } catch (error) {
            console.error(error);
        }
    }

    async addProductToShoppingCart(shoppingCartId, productId){
        try {
            const shoppingCart = await this.getShoppingCartById(shoppingCartId);

            if (!shoppingCart) {
                return 'Shopping Cart not found';
            }

            const productFound = await product.getById(productId);
            
            if(!productFound){
                return 'Product not found'
            }

            shoppingCart.products.push(productFound);

            this.addProduct(shoppingCartId, shoppingCart)

            return `Product with id ${productId} added to cart`

            
        } catch (error) {
            console.error(error);
        }
    }
    
    getAll() {
        try {
            return this.readFile();
        } catch (error) {
            console.error(error);
        }
    }
    
    async deleteProductById(shoppingCartId, productId) {
        try {
            let shoppingCarts = await this.readFile();
            let shoppingCart = shoppingCarts.filter((shoppingCart) => shoppingCart.id == shoppingCartId)
            
            if (shoppingCart.length > 0) {

                shoppingCart[0].products = shoppingCart[0].products.filter((product) => product.id !== productId)

                let index = shoppingCarts.findIndex((shoppingCart) => shoppingCart.id == shoppingCartId);

                shoppingCarts.splice(index, 1, shoppingCart[0]);

                this.writeFile(shoppingCarts);
                return 'Product deleted'
            }else{
                return 'Shopping Cart not found'
            }

        } catch (error) {
            console.error(error);
        }
    }
    
    async deleteAll() {
        try {
            this.writeFile([]);
        } catch (error) {
            console.error(error);
        }
    }

    async addProduct(shoppingCartId, newShoppingCart) {
        try {
            const shoppingCarts = await this.readFile();
            const index = shoppingCarts.findIndex((shoppingCart) => shoppingCart.id == shoppingCartId);
            
            shoppingCarts[index] = newShoppingCart;

            this.writeFile(shoppingCarts);

        } catch (error) {
            console.error(error);
        }
    }
    
    async readFile() {
        try {
            return JSON.parse(await fs.promises.readFile(this.filename, 'utf-8'));
        } catch (error) {
            console.error(error);
        }
    }
    
    async writeFile(content) {
        try {
            await fs.promises.writeFile(this.filename, JSON.stringify(content));
        } catch (error) {
            console.error(error);
        }
    }

    buildId(content) {
        try {
            if (content.length === 0) {
                return 1;
            } else {
                content.sort((a, b) => (a.id > b.id ? 1 : -1));
                return content[content.length - 1].id + 1;
            }
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = ShoppingCart;