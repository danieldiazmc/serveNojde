const { traslateTrakingConditions } = require('../helpers/traslate');
const { autoincrement } = require('../helpers');


const Conditions = require('./Conditions');

const { TrackingSchema  } = require('../schemes');

class Tracking {

    #sender;
    #receiver;
    #size;
    #numTracking;
    #status;
    #conditions;
    #logs;
    #disable;

    constructor(conditions = {}, size = {}, sender = {}, receiver = {}, logs = {}, status = {}) {
        
        this.sender = {...sender};
        this.receiver = {...receiver};
        this.size = {...size};
        this.status = status;
        this.conditions = {...conditions};
        this.logs = logs;
        
    }

    get _sender(){
        return sender;
    }
    get _receiver(){
        return receiver;
    }
    get _size(){
        return size;
    }
    get _status(){
        return status._status;
    }
    get _conditions(){
        return conditions._conditions;
    }
    get _logs(){
        return logs;
    }


    set _sender(value){
        this.sender = value;
    }
    set _receiver(value){
        this.receiver = value;
    }
    set _size(value){
        this.size = value;
    }
    set _status(value){
        this.status = value;
    }
    set _conditions(value){
        this.conditions = value;
    }
    set _logs(value){
        this.logs = value;
    }

    async generateNewTracking(){

        let tracking = {
            sender:this.sender,
            receiver:this.receiver,
            size: this.size,
            conditions: this.conditions,
            status: this.status,
            log:this.logs,
            idTracking: await autoincrement("tracking")
        }

        return {...tracking};
    }

    async findOneTracking(tracking){
        
        let parseTracking = parseInt(tracking, 16);        
        let existTracking = await TrackingSchema.findOne({ idTracking: parseTracking });
        if ( !existTracking ) {
            throw `El Tracking no existe ${ tracking }` ;
        }
        const {sender,receiver,size,status,conditions,log } = existTracking;

        return new Tracking(conditions,size,sender,receiver,log,status);
    }

    toString () {
        return 'Public method toString has been called.';
    }

}


module.exports = Tracking;