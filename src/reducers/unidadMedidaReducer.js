import {
  AGREGAR_UNIDADMEDIDA,
  AGREGAR_UNIDADMEDIDA_EXITO,
  AGREGAR_UNIDADMEDIDA_ERROR,
  COMENZAR_DESCARGA_UNIDADMEDIDA,
  DESCARGA_UNIDADMEDIDA_EXITO,
  DESCARGA_UNIDADMEDIDA_ERROR,
} from "../../src/types/unidadMedidaTypes";

const initialState = {
  unidadMedida: [],
  error: null,
  loading: false,
  // bodegaEliminar: null,
  // bodegaEditar: null,
};

export const unidadMedidaReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_UNIDADMEDIDA:
    case AGREGAR_UNIDADMEDIDA:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_UNIDADMEDIDA_EXITO:
      return {
        ...state,
        unidadMedida: [...state.unidadMedida, action.payload],
        error:null,
        loading:false,
      };
    case AGREGAR_UNIDADMEDIDA_ERROR:
        case DESCARGA_UNIDADMEDIDA_ERROR:
      return {
        ...state,
        error:action.payload,
        loading:false,
      };
      case DESCARGA_UNIDADMEDIDA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        unidadMedida: action.payload,
      };
      
    default:
      return state;
  }
};
