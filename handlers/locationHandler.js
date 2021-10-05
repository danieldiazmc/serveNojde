
const { types,
        customResponse } = require('../helpers');

const { LocationSchema,
        LogLocationSchema } = require('../schemes');

class locationHandler {

    static async createLocation(req, res) {
        //Creo [UbicationCountry]
        const { countryName,
                countryNameKey,
                stateName,
                stateNameKey,
                quadrantName,
                quadrantNameKey,
                codPostal,
                user } = req;

        const location = new LocationSchema(
            { 
                countryName,
                countryNameKey,
                stateName,
                stateNameKey,
                quadrantName,
                quadrantNameKey,
                codPostal
            });

        //Registro el log [LogUbicationCountry]
        const detail = `[ALTA] de [LOCALIDAD] por Usuario:[${user.name}]`;
        const logLocation = new LogLocationSchema({ location:location._id, user:user._id, detail });

        let data = null;

        await Promise.all([location.save(), logLocation.save()])
        .then(results => {
            // results is an array of the results of each promise, in order.
            
            data = {
                results: results[0]
            };
        })
        .catch(err => {
            let payload = { type:types.e401, request:err } ;
            customResponse( payload, res );
        });

        return data; 
    }

    static async searchLocation(req, res) {
        const { aux: query } = req;
        const { limit = 5, from = 0 } = req.query;
        let data = null;

        await Promise.all([
            LocationSchema.countDocuments(),
            LocationSchema.find(query)
                .skip( Number( from ) )
                .limit(Number( limit ))
        ])
        .then(results => {
            data = {
                total:results[0],
                localidades:results[1]
            } ;             
        })
        .catch(err => { 
            let payload = { type:types.e401, request:err } ;
            customResponse( payload, res );
        });

        return data;
    }

}

module.exports = locationHandler;