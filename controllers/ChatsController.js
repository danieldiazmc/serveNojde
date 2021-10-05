const { response } = require('express');

const { types,
        customResponse } = require('../helpers');

// [ POST ] [ CHATS ] [ MESSAGE ]
const postMessage = async(req, res = response) => {

    

    res.json({
        total,
        users
    });
    
}

module.exports = {
    postMessage
}