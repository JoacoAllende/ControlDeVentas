const clienteValidator = {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TheSecretKey';

const clienteController = require('../controllers/cliente.controller');

clienteValidator.validar_createCliente = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const cliente = req.body;
            const doc_tipo = cliente.doc_tipo;
            const doc_nro = cliente.doc_nro;
            let clienteValido = false;
            if (doc_tipo == 80 || doc_tipo == 86) {
                if (CuitCuilValido(doc_nro)) {
                    clienteController.createCliente(req, res);
                    clienteValido = true;
                }
            } else if (doc_tipo == 96) {
                if (dniValido(doc_nro)) {
                    clienteController.createCliente(req, res);
                    clienteValido = true;
                }
            }
            if (!clienteValido)
                res.json('Invalid client');
        } else {
            res.sendStatus(403);
        }
    })
}

clienteValidator.validar_getClientes = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            clienteController.getClientes(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

clienteValidator.validar_getAllClientes = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            clienteController.getAllClientes(req, res);
        } else {
            res.sendStatus(403);
        }
    })
}

clienteValidator.validar_deleteCliente = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const id = req.params.id;
            if (!isNaN(id)) {
                clienteController.deleteCliente(req, res);
            }
            else
                res.json('error');
        } else {
            res.sendStatus(403);
        }
    })
}

clienteValidator.validar_updateCliente = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const cliente = req.body;
            let clienteValido = false;
            const id = cliente.id;
            if (!isNaN(id)) {
                const doc_tipo = cliente.doc_tipo;
                const doc_nro = cliente.doc_nro;
                if (doc_tipo == 80 || doc_tipo == 86) {
                    if (CuitCuilValido(doc_nro)) {
                        clienteController.updateCliente(req, res);
                        clienteValido = true;
                    }
                } else if (doc_tipo == 96) {
                    if (dniValido(doc_nro)) {
                        clienteController.updateCliente(req, res);
                        clienteValido = true;
                    }
                }
            }
            if (!clienteValido)
                res.json('Invalid client');
        } else {
            res.sendStatus(403);
        }
    })
}

CuitCuilValido = (cuit) => {
    if (cuit.toString().length != 11) {
        return false;
    }
    var acumulado = 0;
    var digitos = cuit.toString().split("");
    var digito = digitos.pop();
    for (var i = 0; i < digitos.length; i++) {
        acumulado += digitos[9 - i] * (2 + (i % 6));
    }
    var verif = 11 - (acumulado % 11);
    if (verif == 11) {
        verif = 0;
    }
    if (digito != verif) {
        return false
    } else {
        return true;
    }
}

dniValido = (dni) => {
    if (dni.toString().length != 8) {
        alert("El DNI debe ser de 8 caracteres");
        return false;
    } else {
        return true;
    }
}

module.exports = clienteValidator;