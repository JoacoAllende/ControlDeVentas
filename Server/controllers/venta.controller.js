const ventaCtrl = {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TheSecretKey';

const mysqlConnection = require('../database');

ventaCtrl.createVenta = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const venta = req.body;
            const query = 'INSERT INTO venta (id_cliente, fecha, total) VALUES (' + venta.id_cliente + ', CURDATE(), ' + venta.total + ');';
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
                                        'status': 'created'
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
        } else {
            res.sendStatus(403);
        }
    })
};

ventaCtrl.getVentasFecha = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const fecha = req.params.fecha;
            const query = 'SELECT c.nombre AS cliente, CONCAT(c.cliente_responsable_inscripto,responsable_inscripto) AS cbteTipoSelected, v.id AS id_venta, c.doc_tipo, c.doc_nro, v.* FROM venta AS v INNER JOIN cliente AS c ON (c.id = v.id_cliente) WHERE fecha = "'
                + fecha + '"';
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

ventaCtrl.getDetallesVenta = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const id_venta = req.params.id_venta;
            const query = 'SELECT p.id, p.codigo, p.id_alicuota, a.valor AS alicuota, p.descripcion, dv.cantidad, dv.precio_detalle FROM detalle_venta AS dv INNER JOIN producto AS p ON (p.id = dv.id_producto) INNER JOIN alicuota AS a ON (a.id = p.id_alicuota) WHERE dv.id_venta = ' + id_venta + ';'
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
}

ventaCtrl.updateVenta = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const id_venta = req.params.id_venta;
            const query = "UPDATE venta SET facturado = true WHERE id = " + id_venta;
            mysqlConnection.query(query, () => {
                res.json('updated');
            })
        } else {
            res.sendStatus(403);
        }
    })
}

ventaCtrl.updateVentaCliente = (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err) => {
        if (!err) {
            const id_venta = req.params.id_venta;
            const id_cliente = req.body.id_cliente;
            const query = "UPDATE venta SET id_cliente = " + id_cliente + " WHERE id = " + id_venta;
            mysqlConnection.query(query, () => {
                res.json('updated');
            })
        } else {
            res.sendStatus(403);
        }
    })
}

module.exports = ventaCtrl;