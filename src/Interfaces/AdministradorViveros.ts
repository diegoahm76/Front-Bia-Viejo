export interface  IVivero{
    id_vivero:number,
    nombre:string,
    cod_municipio:string,
    direccion:string,
    area_mt2:number,
    area_propagacion_mt2:number,
    tiene_area_produccion:boolean,
    tiene_areas_pep_sustrato:boolean,
    tiene_area_embolsado:boolean,
    cod_tipo_vivero:string,
    fecha_inicio_viverista_actual:string,
    cod_origen_recursos_vivero:string,
    fecha_inicio_cuarentena:string,
    id_viverista_actual:number,
    id_persona_crea:number,
    ruta_archivo_creacion:string
}

export interface IViveroCreate extends Omit<IVivero, 'id_viverista_actual'>{
    id_viverista_actual:number,
    id_vivero:number,
    nombre:string,
    cod_municipio:string,
    direccion:string,
    area_mt2:number,
    area_propagacion_mt2:number,
    tiene_area_produccion:boolean,
    tiene_areas_pep_sustrato:boolean,
    tiene_area_embolsado:boolean,
    cod_tipo_vivero:string,
    fecha_inicio_viverista_actual:string,
    cod_origen_recursos_vivero:string,
    fecha_inicio_cuarentena:string,
    id_persona_crea:number,
    ruta_archivo_creacion: string
}

export interface  IdViverista{
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
export interface IViveroGeneric {
    viveroEditar: IVivero;
    vivero: IVivero[];
}