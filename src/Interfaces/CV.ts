export interface Icv {
    cvOtherAssets: IcvOtherAssets[];
    cvVehicles: IcvVehicles | null;
    cvComputers: IcvComputers | null;
    cvMaintenance: IcvMaintenance[];
    cvArticles: IcvArtivlesComputers[];
}

export interface IcvMaintenance {
    id_programacion_mantenimiento: number;
    tipo: string;
    fecha: Date | string;
    estado: string;
    responsable: string;
    tipo_descripcion: string;
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
    id_bien: number;
    marca: null | string;
    codigo_bien: string;
    nro_elemento_bien: number;
    nombre: string;
    cod_tipo_bien: string;
    cod_tipo_activo: string;
    nivel_jerarquico: number;
    nombre_cientifico: null | string;
    descripcion: null | string;
    doc_identificador_nro: string;
    cod_metodo_valoracion: null | string;
    cod_tipo_depreciacion: null | string;
    cantidad_vida_util: null | number | string;
    valor_residual: null | number | string;
    stock_minimo: null | number | string;
    stock_maximo: null | number | string;
    solicitable_vivero: boolean;
    tiene_hoja_vida: null | boolean;
    maneja_hoja_vida: boolean;
    visible_solicitudes: boolean;
    id_marca: null | number;
    id_unidad_medida: number;
    id_porcentaje_iva: number;
    id_unidad_medida_vida_util: null | number;
    id_bien_padre: null | number;
    estado: string;
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
    tiene_hoja_vida: null | boolean;
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
    marca: IList;
    estado: string;
    id_bien: number;
}
export interface IList {
    label: string | null;
    value: number | null | string;
}

export interface IcvVehiclesForm {
    id_hoja_de_vida: number;
    codigo_bien: string;
    nombre: string;
    doc_identificador_nro: string;
    marca: IList;
    cod_tipo_vehiculo: IList;
    tiene_platon: boolean | null;
    capacidad_pasajeros: number;
    color: string;
    linea: string;
    tipo_combustible: IList;
    es_arrendado: boolean | null;
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
    es_agendable: boolean | null;
    en_circulacion: boolean | null;
    fecha_circulacion: Date | null | string;
    ruta_imagen_foto: string;
    id_articulo: number;
    id_vehiculo_arrendado: null | number | string;
    id_proveedor: null | number | string;
    estado: null | string;

    id_bien: number | string;
    fecha_expedicion_op: Date | null | string;
    fecha_expiracion_op: Date | null | string;
    fecha_expedicion_soat: Date | null | string;
    fecha_expiracion_soat: Date | null | string;
    numero_soat: string;
    fecha_expedicion_tecnomecanica: Date | null | string;
    fecha_expiracion_tecnomecanica: Date | null | string;
    numero_tecnomecanica: string;
    fecha_expedicion_str: Date | null | string;
    fecha_expiracion_str: Date | null | string;
    numero_str: string;
    nombre_conductor: string;
    tipo_document: IList;
    numero_document: string;
    celular: string;
    email: string;
    direccion: string;
}

export interface IcvArtivlesComputers {
    id_bien: number;
    marca: null | string;
    codigo_bien: string;
    nro_elemento_bien: number;
    nombre: string;
    cod_tipo_bien: string;
    cod_tipo_activo: string;
    nivel_jerarquico: number;
    nombre_cientifico: null | string;
    descripcion: null | string;
    doc_identificador_nro: string;
    cod_metodo_valoracion: null | string;
    cod_tipo_depreciacion: null | string;
    cantidad_vida_util: null | number;
    valor_residual: null | number;
    stock_minimo: null | number;
    stock_maximo: null | number;
    solicitable_vivero: boolean;
    tiene_hoja_vida: boolean | null;
    maneja_hoja_vida: boolean;
    visible_solicitudes: boolean;
    id_marca: number | null;
    id_unidad_medida: number;
    id_porcentaje_iva: number;
    id_unidad_medida_vida_util: null | number;
    id_bien_padre: number | null;
    estado: string;
}



