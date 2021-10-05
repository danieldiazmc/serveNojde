// import Location from '../models';

const { Schema, model } = require('mongoose');

const Location = require('../models/Location');



const LocationSchema = Schema(
    {
        countryName: {
            type:String,
            require:true
        },
        countryNameKey:{
            type:String,
            require:true
        },
        stateName: {
            type:String,
            require:true
        },
        stateNameKey:{
            type:String,
            require:true
        },
        quadrantName: {
            type:String,
            require:true
        },
        quadrantNameKey:{
            type:String,
            require:true
        },
        codPostal:{
            type:String,
            require:true
        },
        disable:{
            type:Boolean,
            default:false
        }
    },
    {
        collection: 'locations',
        timestamps: { createdAt: true, updatedAt: false }
    }
)

LocationSchema.methods.toJSON = function() {

    const { ...e  } = this.toObject();   



    const location = new Location(e.countryName,e.countryNameKey,e.stateName,e.stateNameKey,e.quadrantName,e.quadrantNameKey,e.codPostal);

    let param={
        departamento:location.stateName,
        barrio:location.quadrantName
    };

    return param;
}

module.exports = model( 'locations', LocationSchema );