
const { Schema } = require('mongoose');

const _LogTrackingSchema = new Schema({
    detail: {
        type:String,
        require:true
    }
},
{ 
    _id : false,
    timestamps: { createdAt: true, updatedAt: false }
});



module.exports =  {
    _LogTrackingSchema
};