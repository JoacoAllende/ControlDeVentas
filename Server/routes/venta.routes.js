const express = require('express');
const router = express.Router();
const venta = require('../controllers/venta.controller');

router.post('/ventas', venta.createVenta);

module.exports = router;