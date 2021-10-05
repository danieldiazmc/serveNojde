

const { LocationSchema } = require('../schemes');

const { types,
        customResponse,
        normalizeString } = require('../helpers');
const { parse } = require('uuid');

// [ LOCATION ] Valido si [COUNTRY] [STATE] [QUADRANT] esta registrado
const validateLocationParams = async ( req, res , next ) => {
    const { pais,departamento,barrio,codigoPostal } = req.body;

    let countryNameKey = normalizeString(pais);
    let stateNameKey = normalizeString(departamento);
    let quadrantNameKey = normalizeString(barrio);
    let codPostal = ( Number.isInteger(codigoPostal) ) ? codigoPostal : Number(codigoPostal);

    try {
        const location = await LocationSchema.findOne( { countryNameKey,stateNameKey,quadrantNameKey,codPostal });
        if ( location )   { throw `La localidad ya se encuentra registrada`; }

        req.countryName = pais;
        req.countryNameKey = countryNameKey;
        req.stateName = departamento;
        req.stateNameKey = stateNameKey;
        req.quadrantName = barrio;
        req.quadrantNameKey = quadrantNameKey;
        req.codPostal = codPostal;
        
        next();
        
    } catch (err) {
        let payload = { type:types.e401, request:err } ;
        customResponse( payload, res );
    }    
}

// [ LOCATION ] Obtener por opcion de busquedas
const validLocationParamQuery = async ( req, res , next ) => {

    let query = {};

    if (Object.keys(req.query).length > 0 ){

        const { pais, departamento, barrio, codigoPostal } = req.query;
        
        if(pais != undefined){ query['countryNameKey']=normalizeString(pais) }
        if(departamento != undefined){ query['stateNameKey']=normalizeString(departamento) }
        if(barrio != undefined){ query['quadrantNameKey']=normalizeString(barrio) }
        if(codigoPostal != undefined){ query['codPostal']=normalizeString(codigoPostal) }
        
    }
console.log(query);
    req.aux = query;
    next();

}

module.exports = {
    validateLocationParams,
    validLocationParamQuery
}