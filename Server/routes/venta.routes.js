const express = require('express');
const router = express.Router();
const venta = require('../validations/venta.validation');

router.post('/ventas', venta.validar_createVenta);
router.get('/ventas/:fecha', venta.validar_getVentasFecha);
router.get('/detalles/:id_venta', venta.validar_getDetallesVenta);
router.put('/ventas/:id_venta', venta.validar_updateVenta);

module.exports = router;