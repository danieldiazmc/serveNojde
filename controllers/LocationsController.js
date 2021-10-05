const { response } = require('express');

const { locationHandler } = require('../handlers');

const { types,
        customResponse } = require('../helpers');

// [ POST ] [ LOCATION ]
const postLocation = async(req, res = response) => {

    let payload = { type:types.s200, request: await locationHandler.createLocation(req,res) };
    customResponse( payload, res );
    
}

// [ GET ] [ LOCATION ]
const getLocations = async(req, res = response) => {

    let payload = { type:types.s200, request: await locationHandler.searchLocation(req) };
    customResponse( payload, res );

}

module.exports = {
    postLocation,
    getLocations
}