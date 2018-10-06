'use strict'

const debug = require('debug')('prestamos:db:setup');
const db = require('./index');
const inquirer = require('inquirer');
const chalk = require('chalk');
const util = require('./util');

const promp = inquirer.createPromptModule();
async function setup() {
    const answer = await promp([
        {
            type: 'confir',
            name: 'setup',
            message: `${chalk.green('Esta accion eliminara y volvera a crear la base de datos. ¿estas seguro de continuar?')}\n`
                    +`ingrese ${chalk.green('y')} o ${chalk.green('yes')} para continuar`
        }
    ]);

    if (!answer.setup || (answer.setup.toString().toLowerCase() !== 'y' 
         && answer.setup.toString().toLowerCase() !== 'yes')) {
        return console.log(`${chalk.yellow('[prestamos:db]')} La accion fue cancelada`);
    }

    const dbConfig = util.dbParam('mssql', debug);

    await db(dbConfig).catch(getError);

    console.log(`${chalk.green('[prestamos:db]')} Se ha creado la base de datos ${dbConfig.database}`);
    process.exit(0);
}

function getError(error){
    console.log(`${chalk.red('[prestamos:db:error]')} ${error.message}`);
    console.log(error.stack);
    process.exit(1);
}

setup();