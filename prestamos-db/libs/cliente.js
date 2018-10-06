
'use strict'

module.exports = function setupCliente(ClienteModel) {
    async function findAll() {
        return await ClienteModel.findAll();
    }
    async function findByIdentificacion(identificacion) {
        return await ClienteModel.findOne({
            where: {
                identificacion
            }
        });
    }

    async function findById(id) {
        return await ClienteModel.findOne({
            where: {
                id
            }
        });
    }

    function create(cliente) {
        return  ClienteModel.findOrCreate({
                    where: {
                        identificacion: cliente.identificacion
                    },
                    defaults: cliente
                }).spread((cliente, created) => {
                        return {
                            cliente: created ? cliente.toJSON(): cliente,
                            created
                        }
                });
    }

    async function update(cliente) {
        const cond = {
            where: {
               id: cliente.id
            }
        }
        const clienteUpdate = await ClienteModel.update({ cliente }, cond);
        return  clienteUpdate > 0 ? findById(cliente.id) : false;
    }

    return {
        findAll,
        findByIdentificacion,
        findById,
        create,
        update
    }
}