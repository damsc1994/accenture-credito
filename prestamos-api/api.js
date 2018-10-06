'use strict'

const express = require('express');
const asyncify = require('express-asyncify');
const prestamosDB = require('prestamos-db');
const api = asyncify(express.Router());
const util = require('./util');
const debug = require('debug')('prestamos:api');
const bodyParse = require('body-parser');
const jwt = require('./services/jwt');
const auth = require('./midlewares/authenticated');

let services, Cliente, Solicitud;
api.use('*', async (req, res, next) => {
    if (!services) {
        debug('conectando a la base de datos');
        try {
            services = await prestamosDB(util.dbParam);

            Cliente = services.Cliente;
            Solicitud = services.Solicitud;
        } catch (e) {
            return next(e);
        }
    }
    
    next();
});

api.use(bodyParse.urlencoded({extended: false}));
api.use(bodyParse.json());

api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

////Rutas de cliente////
api.post('/clientes/add', async (req, res, next) => {
    const cliente = req.body;
    let savedCliente;

    try {
      savedCliente = await Cliente.create(cliente);
    } catch (e) {
        next(e);
    }

    return res.status(200).send({
        savedCliente
    });
});

api.get('/clientes/list', async (req, res, next) => {
    let clientes = [];
    try {
        clientes = await Cliente.findAll();
    } catch (e) {
       next(e);
    }

    return res.status(200).send({
        clientes
    });
});


api.get('/cliente/:identificacion', async (req, res, next) => {
    const identificacion = req.params.identificacion;
    let cliente;
    try {
        cliente = await Cliente.findByIdentificacion(identificacion);
    } catch (e) {
        next(e);
    }

    return res.status(200).send({
        cliente
    });
});

api.get('/cliente-token/:identificacion', (req, res, next) => {
    const identificacion = req.params.identificacion;
    Cliente.findByIdentificacion(identificacion).then(
        (cliente) => {
            if(!cliente) return res.status(404).send({message: 'No se ha encontrado al cliente en la base de datos'});
            const token = jwt.createTokkens(cliente);   
            return res.status(200).send({
                    cliente,
                    token
                });
    },
    (e) => {
        next(e);
    });
     
});

api.put('/cliente/update/', async (req, res, next) => {
    const cliente = req.body;
    let clienteUpdate;
    try {
        clienteUpdate = await Cliente.update(cliente);
    } catch (e) {
        next(e);
    };

    if (!clienteUpdate) return res.status(404).send({
        message: 'No se ha encontrado el cliente a modificar'
    });

    return res.status(200).send({
        clienteUpdate
    });
});


///Rutas de solicitud de prestamos
api.post('/solicitud/add', [auth.ensureAuth] , (req, res, next) => {
    const solicitud = req.body;
    let cliente = req.cliente;
        Solicitud.create(cliente.sub, solicitud).then(
            (savedSolicitud) => {
                return res.status(200).send({
                    savedSolicitud
                });
            },
            (e) => {
                next(e);
            }
        );    
});

api.get('/solicitudes/list', async (req, res, next) => {
    let solicitudes = [];
    try {
        solicitudes = await Solicitud.findAll();
    } catch (e) {
        next(e);
    }

    return res.status(200).send({
        solicitudes
    });
})

api.get('/solicitud/:cliente', async (req, res, next) => {
    const idCliente = req.params.cliente;
    let solicitudes = [];
    let cliente;
    try {
        cliente = await Cliente.findByIdentificacion(idCliente);
        if (!cliente) return res.status(404).send({
            message:  `La identificacion ${idCliente} no esta registrada en la base de datos`
        });

        solicitudes = await Solicitud.findByIdCliente(cliente.id);
    } catch (e) {
        next(e);
    }

    return res.status(200).send({
        solicitudes
    });
});

api.get('/solicitud/aprobacion/:id', async (req, res, next) => {
    const solicitud = req.body;
    const solicitudID = req.params.id;
    let solicitudUpdate;
    try {
        solicitudUpdate = await Solicitud.updateAprovada(solicitudID, solicitud);
    } catch(e) {
        next(e);
    }

    if (!solicitudUpdate) return res.status(404).send({
        message: `No se ha podido actualizar la solicitud ${solicitud.id}`
    });

    return res.status(200).send({
        solicitudUpdate
    });
});



module.exports = api