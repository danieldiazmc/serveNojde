const { traslateTrakingConditions } = require('../helpers/traslate');

class Conditions {

    #destination;
    #priority;
    #payment;

    constructor(destination=1,priority=1,payment=1) {
        this.destination = destination;
        this.priority = priority;
        this.payment = payment;
    }

    get _conditions(){
        return {destination,priority,payment};
    }
    get _destination(){
        return destination;
    }
    get _priority(){
        return priority;
    }
    get _payment(){
        return payment;
    }

    set _destination(value){
        this.destination = value;
    }

    set _priority(value){
        this.priority = value;
    }

    set _payment(value){
        this.payment = value;
    }

    traslateDescription(lenguage){

        const {destination,priority,payment} = traslateTrakingConditions;
        
        let  {key:destinationK} = destination[0][lenguage];
        let  {key:priorityK} = priority[0][lenguage];
        let  {key:paymentK} = payment[0][lenguage];

        let {value:paymentName} = payment[this.payment][lenguage];
        let {value:priorityName} = priority[this.priority][lenguage];
        let {value:destinationName} = destination[this.destination][lenguage];

        let description={
            [destinationK] :destinationName,
            [priorityK] : priorityName,
            [paymentK] : paymentName
        }

        return {...description} ;
    }

    toString () {
        return 'Public method toString has been called.';
    }

}


module.exports = Conditions;