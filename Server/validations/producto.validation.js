const prodValidator = {};

const prodController = require('../controllers/productos.controller');

prodValidator.validar_createProducto = (req, res) => {
    const producto = req.body;
    if (producto.precio > 0)
        prodController.createProducto(req, res);
    else 
        res.json('Invalidd product')
}

prodValidator.validar_getProducto = (req, res) => {
    const codigo = req.params.codigo;
    if (!isNaN(codigo))
        prodController.getProducto(req, res);
    else 
        res.json('error');
}

prodValidator.validar_getProductos = (req, res) => {
    prodController.getProductos(req, res);
}

prodValidator.validar_deleteProducto = (req, res) => {
    const id = req.params.id;
    if (!isNaN(id)) {
        prodController.deleteProducto(req, res);
    }
    else
        res.json('error');
}

prodValidator.validar_updateProducto = (req, res) => {
    const producto = req.body;
    if (producto.precio > 0 && !isNaN(producto.id))
        prodController.updateProducto(req, res);
    else
        res.json('error');
}

prodValidator.validar_getProductosAlicuotas = (req, res) => {
    prodController.getProductosAlicuotas(req, res);
}

module.exports = prodValidator;