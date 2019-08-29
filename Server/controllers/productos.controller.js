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

productoCtrl.createProducto = (req, res) => {
    const producto = req.body;
    const query = 'INSERT INTO producto (descripcion, precio) VALUES ("' + producto.descripcion + '", ' + producto.precio + ');';
    mysqlConnection.query(query, (req, rows, fields) => {        
        res.json({
            'status' : 'created'
        })
    })
};

productoCtrl.updateProducto = (req, res) => {
    const producto = req.body;
    const query = 'UPDATE producto SET descripcion = "' + producto.descripcion + '", precio = ' + producto.precio + ' WHERE id = ' + producto.id;
    mysqlConnection.query(query, (err, rows, fields) => {
        res.json('updated');
    })
};

productoCtrl.deleteProducto = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM producto WHERE id = ' + id;
    console.log(query);
    mysqlConnection.query(query, (err, rows, fields) =>{
        res.json('deleted');
    })
};

module.exports = productoCtrl;