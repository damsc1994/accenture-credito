'use strict'
const Sequelize = require('sequelize');
const db = require('../libs/db');

// Ene sta funcion definin¡mos el modelo de la tabla Cliente
module.exports = function setupClienteModel(config) {
    const setupDatabase = db(config);
    return setupDatabase.define('cliente', {
        identificacion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fechaNacimiento: {
            type: Sequelize.DATE,
            allowNull: false
        }

    });
}