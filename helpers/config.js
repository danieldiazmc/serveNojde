

const typePriority={
    1:'express',
    2:'regular',
    3:'diferido',
};

const typeDestination={
    1:'oficina',
    2:'domicilio',
};

const typePayment={
    1:'cupon',
    2:'oficinaRemitente',
    3:'oficinaDestino',
    4:'cuentaCliente',
    5:'pickUp',
    6:'deliver',
};

const typeStatus={
    1:{
        name:'tracking_agencia_creado',
        before:[],
        after:[20]
    },
    2:{
        name:'tracking_recolecta_creado',
        before:[],
        after:[10]
    },    
    10:{
        name:'tracking_recolecta_transporte',
        before:[],
        after:[11]
    },
    11:{
        name:'tracking_recolecta_almacen',
        before:[],
        after:[12]
    },
    12:{
        name:'tracking_recolecta_verificado',
        before:[],
        after:[13]
    },
    13:{
        name:'tracking_agencia_almacen',
        before:[],
        after:[20]
    },
    14:{
        name:'tracking_agencia_ruta_retorno',
        before:[],
        after:[20]
    },
    20:{
        name:'tracking_agencia_ruta_asignada',
        before:[],
        after:[30]
    },
    30:{
        name:'tracking_ruta_en_transporte',
        before:[],
        after:[40,61]
    },
    40:{
        name:'tracking_ruta_proximo_entregar',
        before:[],
        after:[50,60]
    },
    50:{
        name:'tracking_ruta_entregado',
        before:[],
        after:[]
    },
    51:{
        name:'tracking_ruta_entregado_agencia',
        before:[],
        after:[13]
    },
    60:{
        name:'tracking_ruta_ausente',
        before:[],
        after:[14]
    },
    61:{
        name:'tracking_ruta_finalizada',
        before:[],
        after:[14]
    },
    80:{
        name:'tracking_verificado',
        before:[],
        after:[]
    },
    90:{
        name:'tracking_desactivar',
        before:[],
        after:[]
    }
};




module.exports = {
    typeStatus,
    typePayment,
    typeDestination,
    typePriority
}