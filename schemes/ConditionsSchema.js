const { Schema, model } = require('mongoose');

const Conditions = require('../models/Conditions');

const ConditionsSchema = Schema(
    {
        destination: {
            type:String,
            require:true
        },
        priority: {
            type:String,
            require:true
        },
        payment: {
            type:String,
            require:true
        },
        disable:{
            type:Boolean,
            default:false
        }
    },
    {
        collection: 'conditions',
        timestamps: { createdAt: true, updatedAt: false }
    }
)

ConditionsSchema.methods.toJSON = function(doc, ret) {
    const { ...e  } = this.toObject();

    const condition = new Conditions(e.destination,e.priority,e.payment,e.disable);

    let data = condition.traslateDescription('esp');

    return {...data};
}

module.exports = model( 'conditions', ConditionsSchema );