const { response, request } = require('express');

const { conditionHandler } = require('../handlers');

const { types,
        customResponse } = require('../helpers');

// [ POST ] [ CONDITIONS ]
const postConditions = async(req, res = response) => {
    let payload = { type:types.s200, request: await conditionHandler.createConditions(req,res) };
    customResponse( payload, res );
}

// [ GET ] [ CONDITIONS ]
const getConditions = async(req, res = response) => {
    let payload = { type:types.s200, request: await conditionHandler.getConditions(req,res) };
    customResponse( payload, res );
}

module.exports = { 
    postConditions,
    getConditions
}