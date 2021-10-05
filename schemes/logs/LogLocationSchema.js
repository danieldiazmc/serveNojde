const { Schema, model } = require('mongoose');

const LogLocationSchema = Schema(
    {
        location: {
            type: Schema.Types.ObjectId,
            ref: 'locations',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        detail:{
            type:String,
            require:true
        },
        observation:{
            type:String
        },
    },
    {
        collection: 'logLocations',
        timestamps: { createdAt: true, updatedAt: false }
    }
);

LogLocationSchema.methods.toJSON = function() {
    const { __v,  _id, ...param  } = this.toObject();
    param.key = _id;
    return param;
}


module.exports = model( 'logLocations', LogLocationSchema );
