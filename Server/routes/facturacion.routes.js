const express = require('express');
const router = express.Router();
const facturacion = require('../validations/facturacion.validation');

router.post('/facturacionAfip', facturacion.validar_createFacturaAfip);
router.post('/facturacionLocal', facturacion.validar_createFacturaLocal);
router.get('/facturacion/:fecha', facturacion.validar_getFacturasFecha);

module.exports = router;