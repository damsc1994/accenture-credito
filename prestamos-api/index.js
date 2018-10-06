'use strict'

const http = require('http');
const express = require('express');
const chalk = require('chalk');
const asyncify = require('express-asyncify');
const api = require('./api');

const port = process.env.PORT || 1800;
const app = asyncify(express());
const server = http.createServer(app);

app.use('/api', api);

function getError(error) {
    console.log(`${chalk.red('[platziserve:api] Fatal Error')} ${error.message}`);
    console.log(error.stack);
    process.exit(1);
}

process.on('uncaughtException', getError);
process.on('unhandledRejection', getError);

server.listen(port, () => {
    console.log(`El servidor se iniciado en el puerto ${port}`);
})