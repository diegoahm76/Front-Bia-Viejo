export interface Icv {
    cvOtherAssets: IcvOtherAssets[];
    cvVehicles: IcvVehicles[];
    cvComputers: IcvComputers[];
    cvMaintenance: any;
    // cvMantainance: IcvMantainance[];
}

export interface IcvOtherAssets {
    id_hoja_de_vida: number;
    caracteristicas_fisicas: string;
    especificaciones_tecnicas: string;
    observaciones_adicionales: string;
    ruta_imagen_foto: string;
    id_articulo: number;
}
export interface IcvVehicles {
    id_hoja_de_vida: number;
    cod_tipo_vehiculo: string;
    tiene_platon: boolean;
    capacidad_pasajeros: number;
    color: string;
    linea: string;
    tipo_combustible: string;
    es_arrendado: boolean;
    ultimo_kilometraje: number;
    fecha_ultimo_kilometraje: string;
    fecha_adquisicion: string;
    fecha_vigencia_garantia: string;
    numero_motor: string;
    numero_chasis: string;
    cilindraje: number;
    transmision: string;
    dimesion_llantas: number;
    capacidad_extintor: number;
    tarjeta_operacion: string;
    observaciones_adicionales: string;
    es_agendable: boolean;
    en_circulacion: boolean;
    fecha_circulacion: string;
    ruta_imagen_foto: string;
    id_articulo: number;
    id_vehiculo_arrendado?: any;
    id_proveedor?: any;
}
export interface IcvComputers {
    id_hoja_de_vida: number;
    sistema_operativo: string;
    suite_ofimatica: string;
    antivirus: string;
    color: string;
    tipo_de_equipo: string;
    tipo_almacenamiento: string;
    capacidad_almacenamiento: string;
    procesador: string;
    memoria_ram: number;
    observaciones_adicionales: string;
    otras_aplicaciones: string;
    ruta_imagen_foto: string;
    id_articulo: number;

    tipoDocumento: string;
    codigo: string;
    serial: string;
    marca: string;
    estado: string;
}
interface IMarcas {
    id_marca: number;
    nombre: string;
    activo: boolean;
    item_ya_usado: boolean;
}
interface IcvMantainance {
    id_marca: number;
    nombre: string;
    activo: boolean;
    item_ya_usado: boolean;
}


