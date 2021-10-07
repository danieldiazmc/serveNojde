

const validateFields = require('./validateFields');
const validateJwt = require('./validateJwt');
const validateRols = require('./validateRols');
const validateLocation = require('./validateLocation');
const validateTracking = require('./validateTracking');
const validateConditions = require('./validateConditions');
const validateUserChat = require('./validateUserChat');


module.exports = {
    ...validateFields,
    ...validateJwt,
    ...validateRols,
    ...validateLocation,
    ...validateTracking,
    ...validateConditions,
    ...validateUserChat
}