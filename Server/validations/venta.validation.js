const ventaValidator = {};

const ventaController = require('../controllers/venta.controller');

ventaValidator.validar_createVenta = (req, res) => {
    ventaController.createVenta(req, res);
}

ventaValidator.validar_getVentasFecha = (req, res) => {
    ventaController.getVentasFecha(req, res);
}

ventaValidator.validar_getDetallesVenta = (req, res) => {
    ventaController.getDetallesVenta(req, res);
}

module.exports = ventaValidator;