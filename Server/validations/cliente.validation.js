const clienteValidator = {};

const clienteController = require('../controllers/cliente.controller');

clienteValidator.validar_createCliente = (req, res) => {
    clienteController.createCliente(req, res);
}

clienteValidator.validar_getClientes = (req, res) => {
    clienteController.getClientes(req, res);
}

clienteValidator.validar_deleteCliente = (req, res) => {
    clienteController.deleteCliente(req, res);
}

clienteValidator.validar_updateCliente = (req, res) => {
    clienteController.updateCliente(req, res);
}

module.exports = clienteValidator;