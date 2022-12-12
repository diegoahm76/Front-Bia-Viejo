export interface IConfiguracionEstacionGet {
  configuracion: IConfiguracionEstacion[];
  configuracionSeleccionada: IConfiguracionEstacion;
}

export interface IConfiguracionEstacion {
  idConfiguracion: number;
  t003frecuencia: number;
  t003temperaturaAmbienteMax: number;
  t003temperaturaAmbienteMin: number;
  t003humedadAmbienteMax: number;
  t003humedadAmbienteMin: number;
  t003presionBarometricaMax: number;
  t003presionBarometricaMin: number;
  t003velocidadVientoMax: number;
  t003velocidadVientoMin: number;
  t003direccionVientoMax: number;
  t003direccionVientoMin: number;
  t003precipitacionMax: number;
  t003precipitacionMin: number;
  t003luminocidadMax: number;
  t003luminocidadMin: number;
  t003nivelAguaMax: number;
  t003nivelAguaMin: number;
  t003velocidadAguaMax: number;
  t003velocidadAguaMin: number;
  t003fechaMod: string;
  t003userMod: string;
  objectid: number;
  t001Estaciones: IEstacionesInternal
}

interface IEstacionesInternal {
  objectid: number;
  t001nombre: string;
  t001coord1: number;
  t001coord2: number;
  t001fechaMod: string ;
  t001userMod: string;
}

export interface IConfiguracionEstacionEdit  {
  idConfiguracion: number;
  t003frecuencia: number;
  t003temperaturaAmbienteMax: number;
  t003temperaturaAmbienteMin: number;
  t003humedadAmbienteMax: number;
  t003humedadAmbienteMin: number;
  t003presionBarometricaMax: number;
  t003presionBarometricaMin: number;
  t003velocidadVientoMax: number;
  t003velocidadVientoMin: number;
  t003direccionVientoMax: number;
  t003direccionVientoMin: number;
  t003precipitacionMax: number;
  t003precipitacionMin: number;
  t003luminocidadMax: number;
  t003luminocidadMin: number;
  t003nivelAguaMax: number;
  t003nivelAguaMin: number;
  t003velocidadAguaMax: number;
  t003velocidadAguaMin: number;
  t003fechaMod: string;
  t003userMod: string;
  objectid: number;
  t001Estaciones: IEstacionesInternal;
}
