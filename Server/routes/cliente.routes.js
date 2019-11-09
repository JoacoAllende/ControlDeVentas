const express = require('express');
const router = express.Router();
const cliente = require('../validations/cliente.validation');

router.get('/clientes', cliente.validar_getClientes);
router.post('/clientes', cliente.validar_createCliente);
router.put('/clientes', cliente.validar_updateCliente);
router.delete('/clientes/:id', cliente.validar_deleteCliente);

module.exports = router;