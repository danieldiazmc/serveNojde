const { Schema } = require('mongoose');

const _PersonSchema = new Schema({
    name: {
        type:String,
        require:true
    },
    telephone: {
        type:String,
        require:true
    }
},{ _id : false });

module.exports =  {
    _PersonSchema
};