const express = require('express');
const router = express.Router();
const facturacion = require('../validations/facturacion.validation');

// router.get('/facturacion', facturacion.validar_getFacturaciones);
router.post('/facturacion', facturacion.validar_createFactura);
// router.put('/facturacion', facturacion.validar_updateFacturacion);
// router.delete('/facturacion/:id', facturacion.validar_deleteFacturacion);

module.exports = router;