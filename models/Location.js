
class Location {

    #_countryName;
    #_countryNameKey;
    #_stateName;
    #_stateNameKey;
    #_quadrantName;
    #_quadrantNameKey;
    #_codPostal;

    constructor(countryName,countryNameKey,stateName,stateNameKey,quadrantName,quadrantNameKey,codPostal) {
        this._countryName = countryName ;
        this._countryNameKey = countryNameKey ;
        this._stateName = stateName ;
        this._stateNameKey = stateNameKey ;
        this._quadrantName = quadrantName ;
        this._quadrantNameKey = quadrantNameKey ;
        this._codPostal = codPostal ;
    }

    get countryName(){ 
        return this._countryName; 
    }
    get countryNameKey(){ 
        return this._countryNameKey; 
    }
    get stateName(){ 
        return this._stateName; 
    }
    get stateNameKey(){ 
        return this._stateNameKey; 
    }
    get quadrantName(){ 
        return this._quadrantName; 
    }
    get quadrantNameKey(){ 
        return this._quadrantNameKey; 
    }
    get codPostal(){ 
        return this._codPostal; 
    }


    set countryName(value){ 
        this._countryName = values;
    }
    set countryNameKey(value){ 
        this._countryNameKey = values;
    }
    set stateName(value){ 
        this._stateName = values;
    }
    set stateNameKey(value){ 
        this._stateNameKey = values;
    }
    set quadrantName(value){ 
        this._quadrantName = values;
    }
    set quadrantNameKey(value){ 
        this._quadrantNameKey = values;
    }
    set codPostal(value){ 
        this._codPostal = values;
    }
}


module.exports = Location;