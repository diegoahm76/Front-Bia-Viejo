
export interface ICCD {
    CCDS: ICCDObject[];
    CCDCurrent: ICCDObject | null;
}

export interface ICCDObject {
    id_ccd: number;
    id_organigrama_id: number;
    version: string;
    nombre: string;
    fecha_terminado: null | Date;
    fecha_puesta_produccion: null | Date;
    fecha_retiro_produccion: null | Date;
    justificacion: null | string;
    ruta_soporte: string;
    actual: boolean;
}
export interface ICCDForm {
    id_ccd: number;
    version: string;
    nombreCcd: string;
    fecha_terminado: null | Date | string;
    organigrama: IListOrganigrama;
    unidades_organigrama: IListUnity;
}
export interface IListOrganigrama {
    label: string;
    value: number;
}
export interface IListUnity {
    label: string;
    value: string;
}

export interface ISeries {
    seriesCCD: ISeriesObject[];
}
export interface ISeriesObject {
    id_serie_doc: number | null;
    nombre: string;
    codigo: number;
    id_ccd: number;
}
