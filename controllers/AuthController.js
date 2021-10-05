const { response } = require('express');

const { authHandler } = require('../handlers');

const { types,
        customResponse } = require('../helpers');

// [ POST ] [ LOGIN ]
const login = async(req, res = response) => {

    let payload = { type:types.s200, request: await authHandler.auth(req,res) };
    customResponse( payload, res );
    
}


module.exports = {
    login
}
