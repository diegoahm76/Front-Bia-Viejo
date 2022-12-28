export interface Icv {
    cvOtherAssets: IcvOtherAssets[];
    cvVehicles: IcvVehicles | null;
    cvComputers: IcvComputers | null;
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
    id_bien: number;
    marca: null | string;
    codigo_bien: string;
    nro_elemento_bien: number;
    nombre: string;
    cod_tipo_bien: string;
    cod_tipo_activo: string;
    nivel_jerarquico: number;
    nombre_cientifico: null;
    descripcion: null;
    doc_identificador_nro: string;
    cod_metodo_valoracion: null;
    cod_tipo_depreciacion: null;
    cantidad_vida_util: null;
    valor_residual: null;
    stock_minimo: null;
    stock_maximo: null;
    solicitable_vivero: boolean;
    tiene_hoja_vida: null;
    maneja_hoja_vida: boolean;
    visible_solicitudes: boolean;
    id_marca: null;
    id_unidad_medida: number;
    id_porcentaje_iva: number;
    id_unidad_medida_vida_util: null;
    id_bien_padre: number;
    estado: string;
}

export interface IcvComputersForm {
    sistema_operativo: string;
    suite_ofimatica: string;
    antivirus: string;
    color: string;
    tipo_de_equipo: string;
    tipo_almacenamiento: string;
    capacidad_almacenamiento: string;
    procesador: string;
    memoria_ram: string;
    observaciones_adicionales: string;
    otras_aplicaciones: string;
    ruta_imagen_foto: string;
    id_articulo: number;

    codigo_bien: string;
    cod_tipo_bien: string | number;
    nombre: string;
    doc_identificador_nro: string;
    marca: IListMarks;
    estado: string;
    id_bien: number;
}
export interface IListMarks {
    label: string | null;
    value: number | null;
}
interface IcvMantainance {
    id_marca: number;
    nombre: string;
    activo: boolean;
    item_ya_usado: boolean;
}

export interface IcvVehiclesForm {
    id_hoja_de_vida: number;
    codigo_bien: string;
    nombre: string;
    doc_identificador_nro: null | string;
    id_marca: number;
    marca: string;
    cod_tipo_vehiculo: string;
    tiene_platon: boolean;
    capacidad_pasajeros: number;
    color: string;
    linea: string;
    tipo_combustible: string;
    es_arrendado: boolean;
    ultimo_kilometraje: number;
    fecha_ultimo_kilometraje: Date | null | string;
    fecha_adquisicion: Date | null | string;
    fecha_vigencia_garantia: Date | null | string;
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
    fecha_circulacion: Date | null | string;
    ruta_imagen_foto: string;
    id_articulo: number;
    id_vehiculo_arrendado: null | number | string;
    id_proveedor: null | number | string;
    estado: null | string;
}


