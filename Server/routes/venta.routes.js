const express = require('express');
const router = express.Router();
const venta = require('../controllers/venta.controller');

router.post('/ventas', venta.createVenta);
router.get('/ventas:fecha', venta.getVentasFecha)
router.get('/detalles:id_venta', venta.getDetallesVenta)

module.exports = router;