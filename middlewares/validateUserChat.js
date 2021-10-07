const { UserChatSchema } = require('../schemes');

const { types,
        customResponse } = require('../helpers');

const validateUserChatParams = async ( req, res , next ) => {

    


    const { name,ip } = req.body;
    
    try {
        const userChat = await UserChatSchema.findOne( { name,ip });        
        if ( userChat )   { throw `El Usuario se encuentra registrado`; }
        
        next()        
    } catch (err) {
        let payload = { type:types.e401, request:err } ;
        customResponse( payload, res );
    }    
}



module.exports = {
    validateUserChatParams
}
