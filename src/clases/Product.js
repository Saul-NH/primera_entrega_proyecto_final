const fs = require('fs');

class Product {
    constructor(filename) {
        this.filename = filename;
    }

    async save(product) {
        try {
            let content = await this.readFile();
            product.id = this.buildId(content);
            product.timestamp = Date.now();;
            
            content.push(product);
            
            await this.writeFile(content);

            return product;
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            let content = await this.readFile();
            let product = content.filter((product) => product.id === id);
            return content.length == 0 ? null : product[0];
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
    
    async deleteById(id) {
        try {
            let products = await this.readFile();
            let product = products.filter((product) => product.id == id)
            
            if (product.length > 0) {
                this.writeFile(products.filter((product) => product.id !== id));
                return 'Product deleted'
            }else{
                return 'Product not found'
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

    async updateById(id, newProduct) {
        try {
            let products = await this.readFile();
            const productFound = await this.getById(id);
            
            if (!productFound) {
                return productFound
            }
            
            let index = products.findIndex((product) => product.id == id);
            let product = products[index];

            product.name = newProduct.name;
            product.description = newProduct.description;
            product.code = newProduct.code;
            product.image = newProduct.image;
            product.price = newProduct.price;
            product.stock = newProduct.stock;

            products.splice(index, 1, product);
            this.writeFile(products);

            return `Product with ID: ${id} Updated`;

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

module.exports = Product;