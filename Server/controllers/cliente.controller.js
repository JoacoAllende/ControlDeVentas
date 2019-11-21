const clienteCtrl = {};

const mysqlConnection = require('../database');

clienteCtrl.getClientes = (req, res) => {
    const query = 'SELECT c.*, dt.descripcion FROM cliente c INNER JOIN doc_tipo dt ON (dt.id = c.doc_tipo) WHERE c.id != 1 ORDER BY nombre;';
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
};

clienteCtrl.getAllClientes = (req, res) => {
    const query = 'SELECT id, nombre FROM cliente ORDER BY nombre;';
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
};

clienteCtrl.createCliente = (req, res) => {
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
};

clienteCtrl.updateCliente = (req, res) => {
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
};

clienteCtrl.deleteCliente = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM cliente WHERE id = ' + id;
    mysqlConnection.query(query, () =>{
        res.json('deleted');
    })
};

module.exports = clienteCtrl;