'use strict'

const Sequelize = require('sequelize');
const db = require('../libs/db');

// Ene sta funcion definin¡mos el modelo de la tabla Solicitud
module.exports = function setupSolicitudModel(config) {
    const setupDatabase = db(config); 
    return setupDatabase.define('solicitud', {
        empresa: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nit: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fechaInicio: {
            type: Sequelize.DATE,
            allowNull: false
        },
        salario: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        aprobada: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        fechaSolicitud: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        valorCredito: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            defaultValue: 0
        }
    });
}