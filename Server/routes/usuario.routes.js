const express = require('express');
const router = express.Router();
const usuario = require('../validations/usuario.validation');

router.post('/register', usuario.validar_registerUser);
router.post('/login', usuario.validar_loginUser)

module.exports = router;