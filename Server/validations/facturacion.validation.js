const factValidator = {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TheSecretKey';

const factController = require('../controllers/facturacion.controller');

factValidator.validar_createFacturaAfipC = async (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            factController.createFacturaAfipC(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

factValidator.validar_createFacturaAfipB = async (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            factController.createFacturaAfipB(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

factValidator.validar_createFacturaAfipA = async (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            factController.createFacturaAfipA(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

factValidator.validar_createFacturaLocal = async (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            factController.createFacturaLocal(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

factValidator.validar_getFacturasFecha = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            factController.getFacturasFecha(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

module.exports = factValidator;