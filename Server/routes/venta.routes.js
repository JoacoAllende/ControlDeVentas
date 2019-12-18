const express = require('express');
const router = express.Router();
const venta = require('../validations/venta.validation');

router.post('/ventas', ensureToken, venta.validar_createVenta);
router.get('/ventas/:fecha', ensureToken, venta.validar_getVentasFecha);
router.get('/ventas/detalles/:id_venta', ensureToken, venta.validar_getDetallesVenta);
router.put('/ventas/:id_venta', ensureToken, venta.validar_updateVenta);
router.put('/ventas/cliente/:id_venta', ensureToken, venta.validar_updateVentaCliente);

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