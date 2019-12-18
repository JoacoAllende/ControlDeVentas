const prodValidator = {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TheSecretKey';

const prodController = require('../controllers/productos.controller');

prodValidator.validar_createProducto = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const producto = req.body;
            if (producto.precio > 0)
                prodController.createProducto(req, res);
            else
                res.json('Invalidd product')
        } else {
            res.sendStatus(403);
        }
    })
}

prodValidator.validar_getProducto = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const codigo = req.params.codigo;
            if (!isNaN(codigo))
                prodController.getProducto(req, res);
            else
                res.json('error');
        } else {
            res.sendStatus(403);
        }
    })
}

prodValidator.validar_getProductos = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            prodController.getProductos(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

prodValidator.validar_deleteProducto = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const id = req.params.id;
            if (!isNaN(id)) {
                prodController.deleteProducto(req, res);
            }
            else
                res.json('error');
        } else {
            res.sendStatus(403);
        }
    })
}

prodValidator.validar_updateProducto = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const producto = req.body;
            if (producto.precio > 0 && !isNaN(producto.id))
                prodController.updateProducto(req, res);
            else
                res.json('error');
        } else {
            res.sendStatus(403);
        }
    })
}

prodValidator.validar_getProductosAlicuotas = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            prodController.getProductosAlicuotas(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

module.exports = prodValidator;