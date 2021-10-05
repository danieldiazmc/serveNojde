//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//-----------------------> [ trakingSpecifications ]

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
const traslateTrakingConditions = {
    destination:{
        0:{
            esp:{value:'Detinatario',key:'destinatario'},
            eng:{},
            ptg:{}
            },
        1:{
            esp:{value:'Oficina',key:'oficina'},
            eng:{},
            ptg:{}
            },
        2:{
            esp:{value:'Domicilio',key:'domicilio'},
            eng:{},
            ptg:{}
            }
    },
    priority:{
        0:{
            esp:{value:'Prioridad',key:'prioridad'},
            eng:{},
            ptg:{}
            },
        1:{
            esp:{value:'Express',key:'express'},
            eng:{},
            ptg:{}
            },
        2:{
            esp:{value:'Regular',key:'regular'},
            eng:{},
            ptg:{}
            },
        3:{
            esp:{value:'Diferido',key:'diferido'},
            eng:{},
            ptg:{}
            }
    },
    payment:{
        0:{
            esp:{value:'Pago',key:'pago'},
            eng:{},
            ptg:{}
            },
        1:{
            esp:{value:'Cupón',key:'cupon'},
            eng:{},
            ptg:{}
            },
        2:{
            esp:{value:'Oficina Remitente',key:'oficinaremitente'},
            eng:{},
            ptg:{}
            },
        3:{
            esp:{value:'Oficina Destino',key:'oficinadestino'},
            eng:{},
            ptg:{}
            },
        4:{
            esp:{value:'Cuenta Cliente',key:'cuentacliente'},
            eng:{},
            ptg:{}
            },
        5:{
            esp:{value:'Pick Up',key:'pickup'},
            eng:{},
            ptg:{}
            },
        6:{
            esp:{value:'Delivery',key:'delivery'},
            eng:{},
            ptg:{}
            }
    }        
};
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//-----------------------> [ status ]

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
const traslateStatus={
    0:{
        esp:{value:'Estado',key:'estado'},
        eng:{},
        ptg:{}
        },
    1:{
        esp:{value:'Recepcionado',key:'recepcionado'},
        eng:{},
        ptg:{}
        },
    2:{
        esp:{value:'Despachado Domicilio',key:'despachadodomicilio'},
        eng:{},
        ptg:{}
        },
    3:{
        esp:{value:'Despachado Oficina',key:'despachadooficina'},
        eng:{},
        ptg:{}
        },
    4:{
        esp:{value:'Recibido Domicilio',key:'recibidodomicilio'},
        eng:{},
        ptg:{}
        },
    5:{
        esp:{value:'Recibido Oficina',key:'recibidooficina'},
        eng:{},
        ptg:{}
        },
    6:{
        esp:{value:'Entregado Oficina',key:'entregadooficina'},
        eng:{},
        ptg:{}
        },
    7:{
        esp:{value:'Entregado Domicilio',key:'entregadodomicilio'},
        eng:{},
        ptg:{}
        }
}

module.exports = {
    traslateTrakingConditions,
    traslateStatus
}