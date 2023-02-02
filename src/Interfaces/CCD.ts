
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
    nombre:       string;
    codigo:       number;
    id_ccd:       number;
}
