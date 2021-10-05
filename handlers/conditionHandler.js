
const { types,
        customResponse} = require('../helpers');

const { ConditionsSchema } = require('../schemes');

class conditionHandler {

    static async createConditions(req, res) {
        const { destino,prioridad,pago } = req.body;
        let data = null;

        const conditions = new ConditionsSchema(
            { 
                destination:destino,
                priority:prioridad,
                payment:pago
            }
        );

        await Promise.all([conditions.save()])
        .then(results => {
            data = { results: results[0] };
        })
        .catch(err => {
            let payload = { type:types.e401, request:err } ;
            customResponse( payload, res );
        });
        return data;
    }

    static async getConditions(req, res) {
        const { aux: query } = req;
        const { limit = 5, from = 0 } = req.query;
        let data = null;

        await Promise.all(
            [
                ConditionsSchema.countDocuments(),
                ConditionsSchema.find()
                                .skip( Number( from ) )
                                .limit(Number( limit ))
            ]
        )
        .then(results => {
            data =  {
                total:results[0],
                data:results[1]
            } ;             
        })
        .catch(err => { 
            let payload = { type:types.e401, request:err } ;
            customResponse( payload, res );
        });
        return data;
    }
    }

module.exports = conditionHandler;