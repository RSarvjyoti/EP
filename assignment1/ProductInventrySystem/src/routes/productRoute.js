const {Router} = require("express");
const { readProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const productRoute = Router();

productRoute.get('/read', readProduct);
productRoute.post('/create', createProduct);
productRoute.patch('/product/update/:id', updateProduct);
productRoute.delete('/product/delete/:id', deleteProduct);

module.exports = productRoute