export interface IBodega {
    id_bodega: number
    nombre: string;
    cod_municipio: string;
    direccion: string;
    id_responsable: IdResponsable;
    es_principal: boolean;
}

export interface IBodegaCreate extends Omit<IBodega, 'id_responsable' | 'id_bodega'> {
    id_responsable: number;
}

export interface IdResponsable {
    id_persona: number;
    tipo_documento: {
        cod_tipo_documento: string;
        nombre: string;
        precargado: boolean;
        activo: boolean;
        item_ya_usado: boolean;

    };
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    numero_documento: string;
}

export interface IBodegaGeneric {
    bodegaEditar: IBodega;
    bodega: IBodega[];
}