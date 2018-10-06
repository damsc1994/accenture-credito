'use strict'

const debug = require('debug');

module.exports = {
    dbParam: {
            database: process.env.DB_NAME || 'gestion_prestamos',
            username: process.env.DB_USER || 'sa',
            password: process.env.DB_PASS || 'Local123',
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mssql',
            query: {
                raw: true
            },
            logging: s => debug(s)
        }
}