const factValidator = {};

const factController = require('../controllers/facturacion.controller');

factValidator.validar_createFactura = async (req, res) => {
    factController.createFactura(req, res);
}

module.exports = factValidator;