export interface IAlarmas {
    idAlarma: number;
    objectId: number;
    t001Estaciones: IEstacionesInternal;
    t006nombre: string;
    t006color: string;
    t006limite: number
}

interface IEstacionesInternal {
    objectid: number;
    t001nombre: string;
    t001coord1: number;
    t001coord2: number;
    t001fechaMod: string | Date;
    t001userMod: string;
}