
const { Schema } = require('mongoose');

const _OfficeSchema = new Schema({
    officeCod: {
        type:String,
        require:true
    },
    officeName: {
        type:String,
        require:true
    }
},{ _id : false });

module.exports =  {
    _OfficeSchema
};