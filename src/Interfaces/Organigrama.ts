export interface IOrganigram {
    organigram: IObjOrganigram[];
    organigramDelete: IObjOrganigram | {};
    organigramEdit: IObjOrganigram | {};
    levelsOrganigram: IObjNiveles[];
    unityOrganigram: IObjUnidades[];
}

export interface IObjOrganigram {
    id_organigram: number;
    nombre: string;
    fecha_terminado: string | Date;
    descripcion: string;
    fecha_puesta_produccion: string | Date | null;
    fecha_retiro_produccion: string | Date | null;
    justificacion_nueva_version: string | Date | null;
    version: string;
    actual: boolean;
    ruta_resolucion: string | null;
}

interface IObjNiveles {
    id_nivel_organigram: number;
    id_organigram_id: number;
    orden_nivel: number;
    nombre: string;
}

interface IObjUnidades {
    id_unidad_organizacional: number | null,
    id_organigram_id: number | null,
    id_nivel_organigram_id: number | null,
    nombre: string;
    codigo: string;
    cod_tipo_unidad: string;
    cod_agrupacion_documental: string | null;
    unidad_raiz: boolean,
    id_unidad_org_padre_id: string | number | null
}