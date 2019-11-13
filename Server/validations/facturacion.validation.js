const factValidator = {};

const factController = require('../controllers/facturacion.controller');

factValidator.validar_createFacturaAfipC = async (req, res) => {
    factController.createFacturaAfipC(req, res);
}

factValidator.validar_createFacturaAfipB = async (req, res) => {
    factController.createFacturaAfipB(req, res);
}

factValidator.validar_createFacturaLocal = async (req, res) => {
    factController.createFacturaLocal(req, res);
}

factValidator.validar_getFacturasFecha = (req, res) => {
    factController.getFacturasFecha(req, res);
}

module.exports = factValidator;