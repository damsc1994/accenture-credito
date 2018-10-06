'use strict'

module.exports = function setupSolicitud(ClienteModel, SolictudModel) {
    async function findAll() {
        return await SolictudModel.findAll();
    }

    async function findById(id) {
        return await SolictudModel.findOne({
            where: {
                id
            }
        });
    }

    async function findByIdCliente (clienteId) {
        return await SolictudModel.findAll({
            attributes: ['empresa', 'fechaSolicitud', 'salario', 
                         'fechaInicio', 'clienteId', 'aprobada', 'valorCredito'],
            limit: 20,
            order: [['fechaSolicitud', 'DESC']],
            include: [{
                attributes: ['nombre', 'apellido', 'identificacion', 'fechaNacimiento'],
                model: ClienteModel,
                where: {
                    id: clienteId
                }
            }],
            raw: true

        });
    }

    async function create(clienteId, solicitud) {
        const cliente = await ClienteModel.findOne({
            where: {id: clienteId}
        });

        if (cliente) {
            solicitud.clienteId = cliente.id
            const result = await SolictudModel.create(solicitud)
            return result.toJSON()
        }
        return false;
    }

    async function updateAprovada(id, solicitud) {
        const cond = {
            where: {
               id
            }
        }
        const solicitudUpdate = await SolictudModel.update({ 
            aporbada: solicitud.aprobada,
            fechaAprobacion: solicitud.fechaAprobacion 
        }, cond);
        return  solicitudUpdate > 0 ? findById(id) : false;
    }


    return {
        findAll,
        findByIdCliente,
        create,
        updateAprovada
    }
}