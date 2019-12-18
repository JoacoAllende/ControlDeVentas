const ventaValidator = {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TheSecretKey';

const ventaController = require('../controllers/venta.controller');

//SE DEBERÍA CONTROLAR QUE EXISTA EL CÓDIGO Y QUE COINCIDA EL PRECIO DEL DETALLE CON LA MULTIPLICACIÓN DEL PRECIO DEL PRODUCTO CON LA CANTIDAD
ventaValidator.validar_createVenta = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
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
        } else {
            res.sendStatus(403);
        }
    })
}

ventaValidator.validar_getVentasFecha = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            ventaController.getVentasFecha(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

ventaValidator.validar_getDetallesVenta = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            ventaController.getDetallesVenta(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

ventaValidator.validar_updateVenta = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            ventaController.updateVenta(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

ventaValidator.validar_updateVentaCliente = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            ventaController.updateVentaCliente(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

module.exports = ventaValidator;