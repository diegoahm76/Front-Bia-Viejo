export interface IAuth {
    confirmacionEmail: boolean;
    confirmacionCelular: boolean;
}
export interface IDefaultValues {
    tipo_persona: string;
    tipoDocumento: string;
    numero_documento: string;
    razonSocial: string;
    dv: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: string;
    ubicacion_georeferenciada: string;
    pais_residencia: string;
    municipio: string;
    pais_nacimiento: string;
    sexo: string;
    eMail: string;
    cEmail: string;
    cod_pais_nacionalidad_empresa: string;
    celular: string;
    cCelular: string;
    nombreComercial: string;
    acepta_notificacion_sms: boolean;
    acepta_notificacion_email: boolean;
    acepta_tratamiento_datos: boolean;
    direccionNotificacion: string;
}
export interface IAuth {
    confirmacionEmail: boolean;
    confirmacionCelular: boolean;
}
export interface IDatosNotificacion {
    departamento: string;
}
export interface IList {
    label: string;
    value: string;
}
export interface IPerson {
    tipo_persona: string;
    tipo_documento: string;
    numero_documento: string;
    digito_verificacion: string | null;
    nombre_comercial: string;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    fecha_nacimiento: string;
    email: string;
    telefono_celular: string;
    ubicacion_georeferenciada: string;
    razon_social: string;
    telefono_celular_empresa: string;
    direccion_notificaciones: string;
    representante_legal: string;
    cod_municipio_notificacion_nal: string | null;
}
export interface IErrorAxios {
    label: string;
    value: string;
}
export interface IndexColombia {
    label: string;
    value: string;
}
