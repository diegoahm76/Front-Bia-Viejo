
export interface ICCD {
    CCDS: ICCDObject[];
    CCDCurrent: ICCDObject | null;
}

export interface ICCDObject {
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
export interface ICCDForm {
    id_ccd: number;
    version: string;
    nombreCcd: string;
    fecha_terminado: null | Date | string;
    organigrama: IListOrganigrama;
    unidades_organigrama: IListOrganigrama;
}
export interface ICCDAsingForm {
    sries_asignacion: IListOrganigrama;
    sries: string;
    subSerie_asignacion: IListOrganigrama[] | [];
    subSerie: string;
    unidades_asignacion: IListOrganigrama;
}
export interface IListOrganigrama {
    label: string;
    value: number;
}
export interface IListMultiselect {
    list: IListOrganigrama[] | [];
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
    subseries: number[];
}
