const usarioCtrl = {};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'TheSecretKey';
const bcrypt = require('bcryptjs');

const mysqlConnection = require('../database');

usarioCtrl.registerUser = (req, res) => {
    const usuario = req.body;
    const query = 'INSERT INTO usuario (nombre, contraseña) VALUES ("' + usuario.nombre + '","' + bcrypt.hashSync(usuario.contraseña) + '");';
    mysqlConnection.query(query, (err) => {
        if (!err) {
            res.json({
                'status': 'created'
            });
        } else {
            res.json(err.errno);
        }
    })
}

usarioCtrl.loginUser = (req, res) => {
    const usuario = req.body;
    const query = "SELECT id, contraseña FROM usuario WHERE nombre = '" + usuario.nombre + "';";
    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            const logUser = rows[0];
            if (logUser != undefined) {
                console.log(logUser.contraseña);
                console.log(usuario.contraseña);
                const resultPassword = bcrypt.compareSync(usuario.contraseña, logUser.contraseña);
                if (resultPassword) {
                    const id = logUser['id'];
                    const expiresIn = 4 * 60 * 60;
                    const accessToken = jwt.sign({id : id} , SECRET_KEY, {expiresIn: expiresIn});;
                    const us = {
                        'accessToken' : accessToken,
                        'expiresIn' : expiresIn
                    };
                    res.json(us);
                } else {
                    res.json({
                        'status': 'Datos ingresados incorrectos'
                    })
                }
            } else {
                res.json({
                    'status': 'Datos ingresados incorrectos'
                })
            }
        } else {
            res.json(err.errno);
        }
    })
}

module.exports = usarioCtrl;