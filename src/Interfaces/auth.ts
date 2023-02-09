export interface IAuth {
    confirmacionEmail: boolean;
    confirmacionCelular: boolean;
}
export interface IDefaultValues {
    tipoDocumentoLegal: any;
    numero_documento_legal: number | string;
    tipo_persona: any;
    tipoDocumento: any;
    numero_documento: string;
    razonSocial: string;
    dv: string;
    primerNombre: string;
    segundo_nombre: string;
    primerApellido: string;
    segundo_apellido: string | null;
    segundoApellido: string;
    fechaNacimiento: Date | string | null;
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
    municipioNotificacion: any;
    paisNotificacion: any;
    departamentoNotificacion: any;
}
export interface IAuth {
    confirmacionEmail: boolean;
    confirmacionCelular: boolean;
}
export interface IDatosNotificacion {
    departamento: any;
    // departamento: IList | string;
}

export interface IFormValues {
    fechaNacimiento: string | number | Date;
    tipo_persona: IList;
    digito_verificacion: string;
    municipioNotificacion: any;
    paisNotificacion?: any;
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
    nombre_comercial: string | null;
    primer_nombre: string;
    segundo_nombre: string | null;
    primer_apellido: string;
    segundo_apellido: string | null;
    fecha_nacimiento: string | number | Date;
    email: string;
    telefono_celular: string;
    ubicacion_georeferenciada: string;
    razon_social: string;
    telefono_celular_empresa: string;
    direccion_notificaciones: string;
    representante_legal: string;
    cod_municipio_notificacion_nal: string | null;
}
export interface IObjectSend {
    paisNotificacion: any;
    municipioNotificacion: string | null;
}
export interface IDefaultValuesUpdatePassword {
    password: string;
    password2: string;
}
