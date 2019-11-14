const clienteValidator = {};

const clienteController = require('../controllers/cliente.controller');

clienteValidator.validar_createCliente = (req, res) => {
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
}

clienteValidator.validar_getClientes = (req, res) => {
    clienteController.getClientes(req, res);
}

clienteValidator.validar_getAllClientes = (req, res) => {
    clienteController.getAllClientes(req, res);
}

clienteValidator.validar_deleteCliente = (req, res) => {
    const id = req.params.id;
    if (!isNaN(id)) {
        clienteController.deleteCliente(req, res);
    }
    else
        res.json('error');
}

clienteValidator.validar_updateCliente = (req, res) => {
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