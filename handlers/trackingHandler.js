
const { types,
        customResponse } = require('../helpers');

const { TrackingSchema  } = require('../schemes');

class trackingHandler {

    // [ CREATETRACKING ]
    static async createTracking(req, res) {
        const { tracking } = req;

        
        let data = null;

        const trackingObj = new TrackingSchema( await tracking.generateNewTracking() );

        await Promise.all([trackingObj.save()])
        .then(results => {
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

    // [ GETONETRACKING ]
    static async getOneTracking(req, res) {
        const { tracking } = req;
        return { results: tracking  }; ;
    }    

}

module.exports = trackingHandler;