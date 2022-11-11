import {
  AGREGAR_BODEGA,
  AGREGAR_BODEGA_EXITO,
  AGREGAR_BODEGA_ERROR,
  COMENZAR_DESCARGA_BODEGAS,
  DESCARGA_BODEGAS_EXITO,
  DESCARGA_BODEGAS_ERROR,
  ELIMINAR_BODEGA,
  ELIMINAR_BODEGA_EXITO,
  ELIMINAR_BODEGA_ERROR,
} from "../../src/types/bodegasTypes";

const initialState = {
  bodega: [],
  error: null,
  loading: false,
  // estacionEliminar: null,
  // estacionEditar: null,
  // usuarioEliminar: null,
  // usuarioEditar: null,
};

export const bodegaReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_BODEGAS:
    case AGREGAR_BODEGA:
      return {
        ...state,
        loading: action.payload,
      };

    case AGREGAR_BODEGA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        bodega: [...state.bodega, action.payload],
      };

    case AGREGAR_BODEGA_ERROR:
    case DESCARGA_BODEGAS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        //   estacionEliminar: null,
        //   estacionEditar: null,
      };

    case DESCARGA_BODEGAS_EXITO:
        return{
            ...state,
            loading: false,
            error:null,
            bodega:action.payload,
        };

    default:
      return state;
  }
};
