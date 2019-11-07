const factValidator = {};

const factController = require('../controllers/facturacion.controller');

factValidator.validar_createFacturaAfip = async (req, res) => {
    factController.createFacturaAfip(req, res);
}

factValidator.validar_createFacturaLocal = async (req, res) => {
    factController.createFacturaLocal(req, res);
} 

module.exports = factValidator;