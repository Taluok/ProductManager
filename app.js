const ProductManager = require('./ProductManager');

const productManager = new ProductManager('products.json');

productManager.addProduct({
    title: "Producto 1",
    description: "Descripción 1",
    price: 30.99,
    thumbnail: "imagen1.jpg",
    code: "P1",
    stock: 50
});

productManager.addProduct({
    title: "Producto 2",
    description: "Descripción 2",
    price: 50.99,
    thumbnail: "imagen2.jpg",
    code: "P2",
    stock: 30
});

console.log("Todos los productos:", productManager.getProducts());

const productIdToUpdate = 2;
productManager.updateProduct(productIdToUpdate, {
    title: "Producto 2 Actualizado",
    price: 55.99
});

console.log("Producto actualizado:", productManager.getProductById(productIdToUpdate));

const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);
console.log("Producto eliminado:", productIdToDelete);