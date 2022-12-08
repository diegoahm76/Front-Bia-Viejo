export interface IAlarmaGet {
    alarma: IAlarmas[];
    alarmaSeleccionada: IAlarmas;
}
export interface IAlarmas {
    idAlarma: number;
    objectid: number;
    t001Estaciones: IEstacionesInternal;
    t006rango: number,
    t006mensajeUp: string,
    t006mensajeDown: string,
    t006periodo: string,
    t006periodoBase: string,
    t006tolerancia: string,
    t006periodoDesconexion: string
}

interface IEstacionesInternal {
    objectid: number;
    t001nombre: string;
    t001coord1?: number;
    t001coord2?: number;
    t001fechaMod?: string | Date;
    t001userMod: string;
}

export interface IAlarmasEdit extends Omit<IAlarmas, 't001Estaciones'> {
    t001nombreEstacion: string;
    t006rango: number,
    t006mensajeUp: string,
    t006mensajeDown: string,
    t006periodo: string,
    t006periodoBase: string,
    t006tolerancia: string,
    t006periodoDesconexion: string
}