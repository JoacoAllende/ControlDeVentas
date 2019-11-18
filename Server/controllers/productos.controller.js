const productoCtrl = {};

const mysqlConnection = require('../database');

productoCtrl.getProductos = (req, res) => {
    const query = 'SELECT p.*, a.valor AS alicuota FROM producto AS p INNER JOIN alicuota AS a ON (a.id = p.id_alicuota) ORDER BY p.descripcion';
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
};

productoCtrl.getProducto = (req, res) => {
    const codigo = req.params.codigo;
    const query = 'SELECT * FROM producto WHERE codigo = ' + codigo;
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
};

productoCtrl.createProducto = (req, res) => {
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
};

productoCtrl.updateProducto = (req, res) => {
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
};

productoCtrl.deleteProducto = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM producto WHERE id = ' + id;
    mysqlConnection.query(query, () =>{
        res.json('deleted');
    })
};

productoCtrl.getProductosAlicuotas = (req, res) => {
    const query = 'SELECT * FROM alicuota ORDER BY valor;';
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
};

module.exports = productoCtrl;