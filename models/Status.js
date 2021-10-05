
const { typeStatus } = require('../helpers');
class Status {

    #before;
    #current;
    #after;

    constructor(id) {

        let {before,after} = typeStatus[id];

        this.current = id;
        this.before = before;
        this.after = after;
    }

    get _status(){
        return {before,current,after};
    };
    get _before(){
        return before;
    };
    get _current(){
        return current;
    };
    get _after(){
        return after;
    };

    set _before(value){
        this.before = value;
    };
    set _current(value){
        this.current = value;
    };
    set _after(value){
        this.after = value;
    };


}


module.exports = Status;