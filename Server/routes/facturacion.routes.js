const express = require('express');
const router = express.Router();
const facturacion = require('../validations/facturacion.validation');

router.post('/facturacionAfipC', facturacion.validar_createFacturaAfipC);
router.post('/facturacionAfipB', facturacion.validar_createFacturaAfipB);
router.post('/facturacionAfipA', facturacion.validar_createFacturaAfipA);
router.post('/facturacionLocal', facturacion.validar_createFacturaLocal);
router.get('/facturacion/:fecha', facturacion.validar_getFacturasFecha);

module.exports = router;