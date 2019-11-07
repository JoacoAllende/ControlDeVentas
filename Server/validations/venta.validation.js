const ventaValidator = {};

const ventaController = require('../controllers/venta.controller');

//SE DEBERÍA CONTROLAR QUE EXISTA EL CÓDIGO Y QUE COINCIDA EL PRECIO DEL DETALLE CON LA MULTIPLICACIÓN DEL PRECIO DEL PRODUCTO CON LA CANTIDAD
ventaValidator.validar_createVenta = (req, res) => {
    const venta = req.body;
    var error = false;
    venta.detalles.forEach(element => {
        if (element.cantidad < 0 || element.precio_detalle < 0) {
            error = true;
        }
    });
    if (venta.total > 0 && !error) {
        ventaController.createVenta(req, res);
    } else {
        res.json('error');
    }
}

ventaValidator.validar_getVentasFecha = (req, res) => {
    ventaController.getVentasFecha(req, res);
}

ventaValidator.validar_getDetallesVenta = (req, res) => {
    ventaController.getDetallesVenta(req, res);
}

ventaValidator.validar_updateVenta = (req, res) => {
    ventaController.updateVenta(req, res);
}

module.exports = ventaValidator;