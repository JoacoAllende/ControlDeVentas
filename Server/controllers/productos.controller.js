const productoCtrl = {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TheSecretKey';

const mysqlConnection = require('../database');

productoCtrl.getProductos = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const query = 'SELECT p.*, a.valor AS alicuota FROM producto AS p INNER JOIN alicuota AS a ON (a.id = p.id_alicuota) ORDER BY p.descripcion';
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

productoCtrl.getProducto = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const codigo = req.params.codigo;
            const query = 'SELECT * FROM producto WHERE codigo = ' + codigo;
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

productoCtrl.createProducto = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const producto = req.body;
            const query = 'INSERT INTO producto (codigo, descripcion, precio, id_alicuota) VALUES ("' + producto.codigo + '","' + producto.descripcion
            + '", ' + producto.precio + ', ' + producto.alicuotaSelected + ');';
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

productoCtrl.updateProducto = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const producto = req.body;
            const query = 'UPDATE producto SET codigo = "' + producto.codigo + '", descripcion = "' + producto.descripcion + '", precio = ' +
            producto.precio + ', id_alicuota = ' + producto.alicuotaSelected + ' WHERE id = ' + producto.id;
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

productoCtrl.deleteProducto = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const id = req.params.id;
            const query = 'DELETE FROM producto WHERE id = ' + id;
            mysqlConnection.query(query, () =>{
                res.json('deleted');
            })
        } else {
            res.sendStatus(403);
        }
    })
};

productoCtrl.getProductosAlicuotas = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const query = 'SELECT * FROM alicuota ORDER BY valor;';
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

module.exports = productoCtrl;