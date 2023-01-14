export interface ProgramacionMantenimiento {
  tipo_programacion: string;
  cod_tipo_mantenimiento: string;
  kilometraje_programado: string | null;
  fecha_programada: string|null;
  motivo_mantenimiento: string;
  observaciones: string;
  fecha_solicitud: string;
  fecha_anulacion: null;
  justificacion_anulacion: string;
  ejecutado: boolean;
  id_articulo: number;
  id_persona_solicita: number;
  id_persona_anula: number | null;
  //datos tabla
  CO: string;
  SP: string;
  KI: string; //cambiar o debe ser del articulo
 
  FE: string;
  index: number;
}
