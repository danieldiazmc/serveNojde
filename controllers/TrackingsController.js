const { response, request } = require('express');

const { trackingHandler } = require('../handlers');

const { types,
        customResponse } = require('../helpers');        

// [ POST ]
const postTracking = async(req, res = response) => {
    
    let payload = { type:types.s200, request: await trackingHandler.createTracking(req,res) };
    customResponse( payload, res );
}

// [ GET ]
const getTracking = async(req, res = response) => {
    
    let payload = { type:types.s200, request: await trackingHandler.getOneTracking(req,res) };
    customResponse( payload, res );
}

module.exports = { 
    postTracking,
    getTracking
}