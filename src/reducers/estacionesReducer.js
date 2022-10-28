import {
  AGREGAR_ESTACION,
  AGREGAR_ESTACION_ERROR,
  AGREGAR_ESTACION_EXITO,
  COMENZAR_DESCARGA_ESTACIONES,
  DESCARGA_ESTACIONES_ERROR,
  DESCARGA_ESTACIONES_EXITO,
  ESTACION_EDITADO_ERROR,
  ESTACION_EDITADO_EXITO,
  ESTACION_ELIMINADO_ERROR,
  ESTACION_ELIMINADO_EXITO,
  OBTENER_ESTACION_EDITAR,
  OBTENER_ESTACION_ELIMINAR,
} from "../types/estacionesTypes";

const initialState = {
  estaciones: [],
  error: null,
  loading: false,
  estacionEliminar: null,
  estacionEditar: null,
};

export const estacionesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_ESTACIONES:
    case AGREGAR_ESTACION:
      return {
        ...state,
        loading: action.payload,
      };

    case AGREGAR_ESTACION_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        estaciones: [...state.estaciones, action.payload],
      };

    case AGREGAR_ESTACION_ERROR:
    case DESCARGA_ESTACIONES_ERROR:
    case ESTACION_ELIMINADO_ERROR:
    case ESTACION_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        estacionEliminar: null,
        estacionEditar: null,
      };

    case DESCARGA_ESTACIONES_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        estaciones: action.payload,
      };

    case OBTENER_ESTACION_ELIMINAR:
      return {
        ...state,
        estacionEliminar: action.payload,
      };

    case ESTACION_ELIMINADO_EXITO:
      return {
        ...state,
        estaciones: state.estaciones.filter(
          (estacion) => estacion.objectid !== state.estacionEliminar
        ),
        estacionEliminar: null,
      };

    case OBTENER_ESTACION_EDITAR:
      return {
        ...state,
        estacionEditar: action.payload,
      };

    case ESTACION_EDITADO_EXITO:
      return {
        ...state,
        estacionEditar: null,
        estaciones: state.estaciones.map((estacion) =>
          estacion.objectid === action.payload.objectid
            ? (estacion = action.payload)
            : estacion
        ),
      };

    default:
      return state;
  }
};
