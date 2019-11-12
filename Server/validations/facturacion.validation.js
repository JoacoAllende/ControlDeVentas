const factValidator = {};

const factController = require('../controllers/facturacion.controller');

factValidator.validar_createFacturaAfip = async (req, res) => {
    factController.createFacturaAfip(req, res);
}

factValidator.validar_createFacturaLocal = async (req, res) => {
    factController.createFacturaLocal(req, res);
}

factValidator.validar_getFacturasFecha = (req, res) => {
    factController.getFacturasFecha(req, res);
}

module.exports = factValidator;