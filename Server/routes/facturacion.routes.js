const express = require('express');
const router = express.Router();
const facturacion = require('../validations/facturacion.validation');

router.post('/facturacionAfip', facturacion.validar_createFacturaAfip);
router.post('/facturacionLocal', facturacion.validar_createFacturaLocal);

module.exports = router;