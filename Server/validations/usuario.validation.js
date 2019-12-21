const usuarioValidator = {};

const usuarioController = require('../controllers/usuario.controller');

usuarioValidator.validar_registerUser = (req, res) => {
    usuarioController.registerUser(req, res);
}

usuarioValidator.validar_loginUser = (req, res) => {
    usuarioController.loginUser(req, res);
}

module.exports = usuarioValidator;