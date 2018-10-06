'use strict'
const Sequelize = require('sequelize');
const setupDB = require('./libs/db');
const setupClienteModel = require('./models/cliente');
const setupSolicitudModel = require('./models/solicitud');
const setupCliente = require('./libs/cliente');
const setupSolicitud = require('./libs/solicitud');

module.exports = async function (config) {
    const sequelize = setupDB(config);
    const clienteModel = setupClienteModel(config);
    const solicitudModel = setupSolicitudModel(config);

    clienteModel.hasMany(solicitudModel);
    solicitudModel.belongsTo(clienteModel);

    await sequelize.authenticate();
    if (config.setup) {
        // Esta accion eliminara y creara las tablas de la base de datos si existen.
        await sequelize.sync({ force: true });
    }
    const Cliente = setupCliente(clienteModel);
    const Solicitud = setupSolicitud(clienteModel, solicitudModel);

    return {
        Cliente,
        Solicitud
    }
}