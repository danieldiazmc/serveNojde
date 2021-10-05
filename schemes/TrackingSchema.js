const { Schema, model } = require('mongoose');

const { _ConditionSchema,
        _AddressSchema,
        _OfficeSchema,
        _PersonSchema,
        _SizeSchema,
        _LogTrackingSchema,
        _StatuSchema  } = require('./auxs');

// const Tracking = require('../models/Tracking');

const _logs = new Schema({
    rol: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    idUser: {
        type:String,
        require:true
    },
    name: {
        type:String,
        require:true
    },
    detail: {
        type:String,
        require:true
    }
},
{ 
    _id : false,
    timestamps: { createdAt: true, updatedAt: false }
});

const TrackingSchema = Schema(
    {
        idTracking: {
            type:Number,
            require:true
        },
        status: {
            type:_StatuSchema,
            require:true
        },
        conditions:{
            type:_ConditionSchema,
            require:true
        },
        size: {
            type:_SizeSchema,
            require:true
        },
        sender: {
            type:_PersonSchema,
            require:true
        },
        receiver:{
            type:_PersonSchema,
            require:true
        },
        office:{
            type:_OfficeSchema
        },
        address:{
            type:_AddressSchema
        },
        log:[
            _logs
        ],
    },
    {
        collection: 'tracking',
        timestamps: { createdAt: true, updatedAt: true }
    }
)

TrackingSchema.methods.toJSON = function(doc, ret) {
    const { ...e  } = this.toObject();

    let num = e.idTracking.toString(16).toUpperCase();  

    return {num};
}


module.exports = model( 'tracking', TrackingSchema );