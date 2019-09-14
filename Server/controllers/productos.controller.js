const productoCtrl = {};

const mysqlConnection = require('../database');

productoCtrl.getProductos = (req, res) => {
    const query = 'SELECT * FROM producto ORDER BY descripcion';
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
    const query = 'INSERT INTO producto (codigo, descripcion, precio) VALUES ("' + producto.codigo + '","' + producto.descripcion
    + '", ' + producto.precio + ');';
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
    producto.precio + ' WHERE id = ' + producto.id;
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
    console.log(query);
    mysqlConnection.query(query, () =>{
        res.json('deleted');
    })
};

module.exports = productoCtrl;