
export interface ITDR {
    TDRS: ITDRObject[];
    TDRSCurrent: ITDRObject | null;
}

export interface ITDRObject {
    id_ccd: number;
    id_organigrama: number;
    version: string;
    nombre: string;
    fecha_terminado: null | Date;
    fecha_puesta_produccion: null | Date;
    fecha_retiro_produccion: null | Date;
    justificacion: null | string;
    ruta_soporte: string;
    actual: boolean;
}
export interface ITDRForm {
    ccds: IlistCCD | null;
    nombre: string;
    version: string;
}
export interface ITDRAsingForm {
    sries_asignacion: IlistCCD;
    sries: string;
    subSerie_asignacion: IlistCCD[] | [];
    subSerie: string;
    unidades_asignacion: IlistCCD;
}
export interface IlistCCD {
    label: string;
    value: number;
}
export interface IListMultiselect {
    list: IlistCCD[] | [];
}
export interface ISeries {
    seriesCCD: ISeriesObject[];
    serieCCDCurrent: ISeriesObject | null;
}
export interface ISeriesObject {
    id_serie_doc: number | null;
    nombre: string;
    codigo: number;
    id_ccd: number;
}
export interface ISubSeries {
    subSeriesCCD: ISubSeriesObject[];
    subSeriesCCDCurrent: ISubSeriesObject | null;
}
export interface ISubSeriesObject {
    id_subserie_doc: number | null;
    nombre: string;
    codigo: number;
    id_ccd: number;
}
export interface IAssignments {
    assignmentsCCD: IAssignmentsObject[];
    assignmentsCCDCurrent: IAssignmentsObject | null;
}
export interface IAssignmentsObject {
    id_unidad_organizacional: number;
    id_serie_doc: number;
    subseries: any[];
    id_serie_subserie_doc?: number;
    seccion?: string;
    codigo_serie?: number;
    nombre_serie?: string;
    id?: number;
}
