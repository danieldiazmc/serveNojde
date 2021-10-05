
const { Schema } = require('mongoose');

const _StatuSchema = new Schema({
    current: {
        type:Number,
        require:true
    },
    before:[],
    after:[]
},{ _id : false });

module.exports =  {
    _StatuSchema
};