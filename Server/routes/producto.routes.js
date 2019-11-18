const express = require('express');
const router = express.Router();
const producto = require('../validations/producto.validation');

router.get('/productos', producto.validar_getProductos);
router.post('/productos', producto.validar_createProducto);
router.put('/productos', producto.validar_updateProducto);
router.delete('/productos/:id', producto.validar_deleteProducto);
router.get('/productos/:codigo', producto.validar_getProducto);
router.get('/productos-alicuotas', producto.validar_getProductosAlicuotas);

module.exports = router;