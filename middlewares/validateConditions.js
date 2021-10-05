const { types,
        customResponse } = require('../helpers');

const { ConditionsSchema } = require('../schemes');

// [ TRACKING ]
const validateConditions = async ( req, res , next ) => {
    const { destino,prioridad,pago } = req.body;

    try {
        const condition = await ConditionsSchema.findOne({ 
            destination:destino,
            priority:prioridad,
            payment:pago
        });
        if ( condition ) { 
            throw 'La condicion ya esta registrada';
            
            // let payload = { type:types.e401, request:'La especidicacion ya esta registrada' } ;
            // customResponse( payload, res );
        }
        
        next();
        
    } catch (err) {
        let payload = { type:types.e401, request:err} ;
        customResponse( payload, res );
    }    
}


module.exports = {
    validateConditions,
}