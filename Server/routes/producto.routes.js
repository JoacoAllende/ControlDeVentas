const express = require('express');
const router = express.Router();
const producto = require('../controllers/productos.controller');

router.get('/productos', producto.getProductos);
router.post('/productos', producto.createProducto);
router.put('/productos', producto.updateProducto);
router.delete('/productos:id', producto.deleteProducto);
router.get('/productos:codigo', producto.getProducto);

module.exports = router;