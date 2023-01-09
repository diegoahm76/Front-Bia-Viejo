export interface Welcome {
    id_auditoria:          number;
    id_modulo:             IDModulo;
    id_usuario:            IDUsuario | null;
    fecha_accion:          Date;
    subsistema:            Subsistema;
    dirip:                 Dirip;
    descripcion:           string;
    valores_actualizados:  null;
    id_cod_permiso_accion: IDCodPermisoAccion;
}

export enum Dirip {
    The186190226193 = "186.190.226.193",
    The1861902265 = "186.190.226.5",
    The1868490254 = "186.84.90.254",
}

export enum IDCodPermisoAccion {
    CR = "CR",
}

export interface IDModulo {
    id_modulo:     number;
    nombre_modulo: NombreModulo;
    subsistema:    Subsistema;
    descripcion:   Descripcion;
}

export enum Descripcion {
    PermiteAdministrarLosRolesDelSistema = "Permite administrar los roles del sistema",
    PermiteCrearUnUsuarioVíaPortal = "Permite crear un usuario vía Portal",
}

export enum NombreModulo {
    CreaciónUsuarioVíaPortal = "Creación Usuario Vía Portal",
    Roles = "Roles",
}

export enum Subsistema {
    Segu = "SEGU",
}

export interface IDUsuario {
    id_usuario:           number;
    _id:                  number;
    isAdmin:              boolean;
    id_usuario_creador:   null;
    persona:              Persona;
    password:             string;
    last_login:           null;
    nombre_de_usuario:    string;
    is_active:            boolean;
    is_staff:             boolean;
    is_superuser:         boolean;
    is_blocked:           boolean;
    creado_por_portal:    boolean;
    created_at:           Date;
    activated_at:         null;
    is_creado_por_portal: boolean;
    tipo_usuario:         string;
    profile_img:          string;
    email:                string;
    groups:               any[];
    user_permissions:     any[];
}

export interface Persona {
    id_persona:                      number;
    tipo_documento:                  TipoDocumento;
    estado_civil:                    TipoDocumento | null;
    representante_legal:             null;
    tipo_persona:                    string;
    numero_documento:                string;
    digito_verificacion:             null | string;
    primer_nombre:                   string;
    segundo_nombre:                  string;
    primer_apellido:                 string;
    segundo_apellido:                string;
    nombre_comercial:                string;
    razon_social:                    null;
    pais_residencia:                 string;
    municipio_residencia:            null | string;
    direccion_residencia:            null | string;
    direccion_residencia_ref:        null | string;
    ubicacion_georeferenciada:       string;
    direccion_laboral:               null | string;
    direccion_notificaciones:        null | string;
    pais_nacimiento:                 string;
    fecha_nacimiento:                Date;
    sexo:                            string;
    fecha_asignacion_unidad:         null;
    es_unidad_organizacional_actual: null;
    email:                           string;
    email_empresarial:               null;
    telefono_fijo_residencial:       null | string;
    telefono_celular:                string;
    telefono_empresa:                null;
    cod_municipio_laboral_nal:       null | string;
    cod_municipio_notificacion_nal:  null | string;
    telefono_celular_empresa:        null;
    telefono_empresa_2:              null | string;
    cod_pais_nacionalidad_empresa:   null;
    acepta_notificacion_sms:         boolean;
    acepta_notificacion_email:       boolean;
    acepta_tratamiento_datos:        boolean;
    id_cargo:                        null;
    id_unidad_organizacional_actual: null;
}

export interface TipoDocumento {
    cod_estado_civil?:   string;
    nombre:              Nombre;
    precargado:          boolean;
    activo:              boolean;
    item_ya_usado:       boolean;
    cod_tipo_documento?: string;
}

export enum Nombre {
    CédulaDeCiudadanía = "Cédula de ciudadanía",
    Soltero = "Soltero",
}
