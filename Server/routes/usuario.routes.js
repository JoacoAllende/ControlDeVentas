const express = require('express');
const router = express.Router();
const usuario = require('../validations/usuario.validation');

router.post('/register', usuario.validar_registerUser);
router.post('/login', usuario.validar_loginUser);
router.get('/login', ensureToken, usuario.validar_getLogin);

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;