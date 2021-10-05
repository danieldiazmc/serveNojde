
const { Schema } = require('mongoose');

const _MessageSchema = new Schema({
    text: {
        type:String,
        require:true
    },
    emisor: {
        type:String,
        require:true
    }
},{ _id : false });

module.exports =  {
    _MessageSchema
};