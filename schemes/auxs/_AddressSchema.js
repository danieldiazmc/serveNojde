const { Schema } = require('mongoose');


const _AddressSchema = new Schema({
    countryName: {
        type:String,
        require:true
    },
    stateName: {
        type:String,
        require:true
    },
    quadrantName: {
        type:String,
        require:true
    },
    codPostal:{
        type:String,
        require:true
    },
    street: {
        type:String,
        require:true
    },
    door: {
        type:String,
        require:true
    },
    detail: {
        type:String,
        require:true
    },
    geolocation:{
         lat: {
             type:String,
             require:true
            }, 
        lng: {
            type:String,
            require:true
        } 
    }
},{ _id : false });

module.exports =  {
    _AddressSchema
};