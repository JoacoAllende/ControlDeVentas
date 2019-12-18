const express = require('express');
const router = express.Router();
const producto = require('../validations/producto.validation');

router.get('/productos', ensureToken, producto.validar_getProductos);
router.post('/productos', ensureToken, producto.validar_createProducto);
router.put('/productos', ensureToken, producto.validar_updateProducto);
router.delete('/productos/:id', ensureToken, producto.validar_deleteProducto);
router.get('/productos/:codigo', ensureToken, producto.validar_getProducto);
router.get('/productos-alicuotas', ensureToken, producto.validar_getProductosAlicuotas);

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;