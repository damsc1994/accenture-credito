'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'PRESTAMOS_TOKEN';

exports.createTokkens = function (cliente){
    var payload = {
        sub: cliente.id,
        identificacion: cliente.identificacion,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        fechaNacimiento: cliente.fechaNacimiento,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix()
    };

    return jwt.encode(payload, secret);
}