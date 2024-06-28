export interface I_grupos {
    codigo:number;
    descripcion:string;
    flagGrupoCompleto:boolean
}

export interface I_empleador {
    ruc:string;
    razonSocial:string;
    direccion:string;
    departamento:string;
    provincia:string;
    distrito:string;
}

export interface I_inicioOperacion {
    codigoOrientacion:       number;
    codigoPregunta:          number;
    descripcionPregunta:     string;
    flagUrlDescarga1:        string;
    urlDescarga1:            null;
    descripcionUrlDescarga1: null;
    flagUrlDescarga2:        string;
    urlDescarga2:            null;
    descripcionUrlDescarga2: null;
    opciones:                I_opciones[];
}

export interface I_PreguntaOpciones {
    codigoOrientacion:       number;
    codigoPregunta:          number;
    descripcionPregunta:     string;
    urlDescarga1:            string;
    descripcionUrlDescarga1: string;
    urlDescarga2:            null;
    descripcionUrlDescarga2: null;
    opciones:                I_opciones[];
}

export interface I_opciones {
    codigo:      number;
    descripcion: string;
    orden:       number;
}

export interface I_archivosDescarga {
    flagUrlDescarga:   string;
    urlDescarga:       string;
    descripcion:       string;
    tipoDocumentoApoyoURL: string;
}