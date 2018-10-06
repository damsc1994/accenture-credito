'use strict'

module.exports = {
    dbParam: (dialectDB, debug) => ({
            database: process.env.DB_NAME || 'gestion_prestamos',
            username: process.env.DB_USER || 'sa',
            password: process.env.DB_PASS || 'Local123',
            host: process.env.DB_HOST || 'localhost',
            dialect: dialectDB,
            setup: true,
            query: {
                raw: true
            },
            logging: s => debug(s)
        })
}