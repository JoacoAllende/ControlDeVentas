const clienteCtrl = {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TheSecretKey';

const mysqlConnection = require('../database');

clienteCtrl.getClientes = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const query = 'SELECT c.*, dt.descripcion FROM cliente c INNER JOIN doc_tipo dt ON (dt.id = c.doc_tipo) WHERE c.id != 1 ORDER BY nombre;';
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }
            })
        } else {
            res.sendStatus(403);
        }
    })
};

clienteCtrl.getAllClientes = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const query = 'SELECT id, nombre FROM cliente ORDER BY nombre;';
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }
            })
        } else {
            res.sendStatus(403);
        }
    })
};

clienteCtrl.createCliente = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const cliente = req.body;
            const query = 'INSERT INTO cliente (nombre, doc_tipo, doc_nro, telefono, cliente_responsable_inscripto) VALUES ("' + cliente.nombre + '",' + cliente.doc_tipo
            + ', ' + cliente.doc_nro + ', "' + cliente.telefono + '", ' + cliente.cliente_responsable_inscripto + ');';
            mysqlConnection.query(query, (err) => {
                if (!err) {
                    res.json({
                        'status' : 'created'
                    })
                } else {
                    res.json(err.errno);
                }
            })
        } else {
            res.sendStatus(403);
        }
    })
};

clienteCtrl.updateCliente = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const cliente = req.body;
            const query = 'UPDATE cliente SET nombre = "' + cliente.nombre + '", doc_tipo = ' + cliente.doc_tipo + ', doc_nro = ' +
            cliente.doc_nro + ', cliente_responsable_inscripto = ' + cliente.cliente_responsable_inscripto + ', telefono = "' + cliente.telefono + '" WHERE id = ' + cliente.id;
            mysqlConnection.query(query, (err) => {
                if (!err) {
                    res.json({
                        'status' : 'updated'
                    })
                } else {
                    res.json(err.errno);
                }
            })
        } else {
            res.sendStatus(403);
        }
    })
};

clienteCtrl.deleteCliente = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const id = req.params.id;
            const query = 'DELETE FROM cliente WHERE id = ' + id;
            mysqlConnection.query(query, () =>{
                res.json('deleted');
            })
        } else {
            res.sendStatus(403);
        }
    })
};

module.exports = clienteCtrl;