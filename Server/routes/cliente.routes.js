const express = require('express');
const router = express.Router();
const cliente = require('../validations/cliente.validation');

router.get('/clientes', ensureToken, cliente.validar_getClientes);
router.get('/Allclientes', ensureToken, cliente.validar_getAllClientes);
router.post('/clientes', ensureToken, cliente.validar_createCliente);
router.put('/clientes', ensureToken, cliente.validar_updateCliente);
router.delete('/clientes/:id', ensureToken, cliente.validar_deleteCliente);

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