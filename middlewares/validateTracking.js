const { types,
        typePayment,
        typeDestination,
        typePriority,
        customResponse } = require('../helpers');

const Tracking = require('../models/Tracking');
const Status = require('../models/Status');



// [ TRACKING ]
const validateNewTracking = async ( req, res , next ) => {

    const {  _id,name,email,rol } = req.user ;

    const { tipoDestino,
            tipoPago,
            tipoPrioridad,
            peso,
            largo,
            ancho,
            alto,
            destinoNombre,
            destinoTelefono,
            remiteNombre,
            remiteTelefono } = req.body;

    try {

        if(typeDestination[tipoDestino] == undefined || typePriority[tipoPrioridad] == undefined || typePayment[tipoPago] == undefined){
            throw `Verifique los datos ingresados`;
        }

        if(peso <= 0 || largo <= 0 || ancho <= 0 || alto <= 0 ){
            throw `Verifique las medidas ingresados`;
        }

        let conditions = {
            destination:tipoDestino,
            priority:tipoPrioridad,
            payment:tipoPago
        }

        let sender={
            name:remiteNombre,
            telephone: remiteTelefono
        }

        let receiver={
            name:destinoNombre,
            telephone: destinoTelefono
        }

        let size = {
            weight:peso,
            length:largo,
            width:ancho,
            tall:alto
        };

        let log = [ 
            { idUser:_id , detail:'Se creo el tracking' , name , email , rol } 
        ];

        req.tracking =  new Tracking(conditions,size,sender,receiver,log,new Status(1));
        next();
        
    } catch (err) {
        let payload = { type:types.e401, request:err} ;
        customResponse( payload, res );
    }    
}

const isExistTracking = async( req, res , next ) => {

    try {

        const { tracking } = req.query ;
        const modelTracking = new Tracking();
        req.tracking =  await modelTracking.findOneTracking(tracking);
        next();
        
    } catch (err) {
        let payload = { type:types.e401, request:err} ;
        customResponse( payload, res );
    } 
       
}


module.exports = {
    validateNewTracking,
    isExistTracking
}