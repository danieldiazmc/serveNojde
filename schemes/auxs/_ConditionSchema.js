const { Schema } = require('mongoose');

const _ConditionSchema = new Schema({
    destination: {
        type:Number,
        require:true
    },
    priority: {
        type:Number,
        require:true
    },
    payment: {
        type:Number,
        require:true
    },
},{ _id : false });

module.exports =  {
    _ConditionSchema
};