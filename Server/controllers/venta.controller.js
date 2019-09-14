const ventaCtrl = {};

const mysqlConnection = require('../database');

ventaCtrl.createVenta = (req, res) => {
    const venta = req.body;
    const query = 'INSERT INTO venta (id_cliente, fecha, total) VALUES (1, CURDATE(), ' + venta.total + ');';
    mysqlConnection.query(query, (err) => {
        if (!err) {
            const query_id_venta = 'SELECT last_insert_id() AS id_venta';
            mysqlConnection.query(query_id_venta, (err, rows) => {
                if (!err) {
                    id_venta = rows[0].id_venta;
                    id_detalle = 1;
                    query_detalles = "INSERT INTO detalle_venta (id_venta, id_detalle, id_producto, cantidad, precio_detalle) VALUES"
                    venta.detalles.forEach(detalle => {
                        query_detalles += '(' + id_venta + ',' + id_detalle + ',' + detalle.id_producto + ',' + detalle.cantidad + ','
                         + detalle.precio_detalle + '),';
                         id_detalle++;
                    });
                    query_detalles = query_detalles.slice(0, -1);
                    query_detalles += ';';
                    mysqlConnection.query(query_detalles, (err, rows) => {
                        if (!err) {
                            res.json({
                                'status' : 'created'
                            })
                        } else {
                            res.json(err.errno);
                        }
                    })
                }
            })
        } else {
            res.json(err.errno);
        }
    })
};

module.exports = ventaCtrl;