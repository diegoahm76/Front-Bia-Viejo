export interface IAuth {
  confirmacionEmail: boolean;
  confirmacionCelular: boolean;
}
export interface IDefaultValues {
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  razonSocial: string;
  dv: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: any;
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
  nombreDeUsuario: string;
  password: string;
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

export interface UserRol {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
  representante_legal: boolean;
  nombre_empresa: null;
}

export interface Tokens {
  refresh: string;
  access: string;
}

export interface IUser {
  email: string;
  nombre_de_usuario: string;
  tokens: Tokens;
  is_superuser: boolean;
  id_usuario: number;
  tipo_usuario: string;
  id_persona: number;
  tipo_persona: string;
}
export interface IUserInfo {
  permisos: [];
  representante_legal: string;
  userinfo: IUser;
  userSesion: string;
  reintentos: boolean;
  openDialog: boolean;
  entorno: string;
  isLogged: boolean;
  dialogRepresentante: boolean;
}

export interface Permissions {
  subsistema: string;
  desc_subsistema: string;
  modulos: Modulo[];
}

export interface Modulo {
  id_modulo: number;
  nombre_modulo: string;
  descripcion: string;
  ruta_formulario: string;
  nombre_icono: string;
  permisos: Permisos;
}

export interface Permisos {
  actualizar?: boolean;
  consultar: boolean;
  ejecutar?: boolean;
  crear?: boolean;
  borrar?: boolean;
}
