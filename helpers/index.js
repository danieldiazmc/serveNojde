

const generarJWT = require('./generar-jwt');
const dbValidators = require('./db-validators');
const normalizeString = require('./normalize-string');
const types = require('./types');
const customResponse = require('./customResponse');
const config = require('./config');
const traslate = require('./traslate');
const autoincrement = require('./autoincrement');

module.exports = {
    ...config,
    ...traslate,
    ...generarJWT,
    ...dbValidators,
    ...normalizeString,
    ...types,
    ...customResponse,
    ...autoincrement
}