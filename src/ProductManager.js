const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.loadProductsFromFile();
    }

    loadProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.productIdCounter = Math.max(...this.products.map(product => product.id), 0) + 1;
        } catch (error) {
            this.products = [];
            this.productIdCounter = 1;
        }
    }

    saveProductsToFile() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    addProduct(productData) {
        const product = {
            id: this.productIdCounter++,
            ...productData
        };

        this.products.push(product);
        this.saveProductsToFile();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
        }
    }

    updateProduct(id, updatedData) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { id, ...updatedData };
            this.saveProductsToFile();
        } else {
            console.error("Producto no encontrado para actualizar.");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProductsToFile();
        } else {
            console.error("Producto no encontrado para eliminar.");
        }
    }
}


module.exports = ProductManager;


