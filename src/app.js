const express = require('express');
const app = express();
const port = 8080;
const ProductManager = require('../ProductManager');

const productManager = new ProductManager('products.json');

app.use(express.json());

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Ruta para obtener un producto por su ID
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params; 
    const product = await productManager.getProductById(parseInt(productId));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(8080, () => {
    console.log(`Servidor Express escuchando en el puerto 8080`);
});

