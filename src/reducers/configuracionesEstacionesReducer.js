import {
  COMENZAR_DESCARGA_CONFIGURACIONES,
  CONFIGURACION_EDITADO_ERROR,
  CONFIGURACION_EDITADO_EXITO,
  DESCARGA_CONFIGURACIONES_ERROR,
  DESCARGA_CONFIGURACIONES_EXITO,
  OBTENER_CONFIGURACION_EDITAR,
} from "../types/configuracionesEstacionesTypes";

const initialState = {
  configuraciones: [],
  error: null,
  loading: false,
  configuracionEditar: null,
};

export const configuracionesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_CONFIGURACIONES:
      return {
        ...state,
        loading: action.payload
      }
    
    case DESCARGA_CONFIGURACIONES_EXITO:
      return {
        ...state,
        configuraciones: action.payload,
        loading: false,
        error: null
      }

    case DESCARGA_CONFIGURACIONES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        configuracionEditar: null
      }
    
    case CONFIGURACION_EDITADO_ERROR:
    case OBTENER_CONFIGURACION_EDITAR:
      return {
        ...state,
        configuracionEditar: action.payload
      }

    case CONFIGURACION_EDITADO_EXITO:
      return {
        ...state,
        configuracionEditar: null,
        configuraciones: state.configuraciones.map(configuracion => configuracion.idConfiguracion === action.payload.idConfiguracion ? configuracion = action.payload : configuracion)
      }
  
    default:
      return state
  }
}