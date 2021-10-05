const { Decimal128 } = require('mongodb');
const { Schema } = require('mongoose');

const _SizeSchema = new Schema({
    weight: {
        type:Decimal128,
        require:true
    },
    width: {
        type:Decimal128,
        require:true
    },
    length: {
        type:Decimal128,
        require:true
    },
    tall: {
        type:Decimal128
        ,require:true
    }
},{ _id : false });

module.exports =  {
    _SizeSchema
};