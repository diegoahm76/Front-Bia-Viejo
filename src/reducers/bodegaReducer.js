import {
  AGREGAR_BODEGA,
  AGREGAR_BODEGA_EXITO,
  AGREGAR_BODEGA_ERROR,
  COMENZAR_DESCARGA_BODEGAS,
  DESCARGA_BODEGAS_EXITO,
  DESCARGA_BODEGAS_ERROR,
  OBTENER_BODEGA_ELIMINAR,
  ELIMINAR_BODEGA_EXITO,
  ELIMINAR_BODEGA_ERROR,
  OBTENER_BODEGA_EDITAR,
  EDITAR_BODEGA_EXITO,
  EDITAR_BODEGA_ERROR,
} from "../../src/types/bodegasTypes";

const initialState = {
  bodega: [],
  error: null,
  loading: false,
  bodegaEliminar: null,
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

    case OBTENER_BODEGA_EDITAR:
      return {
        ...state,
        bodegaEditar: action.payload,
      };
    case EDITAR_BODEGA_EXITO:
      return {
        ...state,
        bodegaEditar: null,
        bodega: state.bodega.map((bodega) =>
          bodega.id_bodega === action.payload.id_bodega
            ? (bodega = action.payload)
            : bodega
        ),
      };
    case AGREGAR_BODEGA_ERROR:
    case DESCARGA_BODEGAS_ERROR:
    case ELIMINAR_BODEGA_ERROR:
    case EDITAR_BODEGA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        bodegaEliminar: null,
        bodegaEditar: null,
      };

    case DESCARGA_BODEGAS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        bodega: action.payload,
      };

    case ELIMINAR_BODEGA_EXITO:
      return {
        ...state,
        bodega: state.bodega.filter(
          (bodega) => bodega.id_bodega !== state.bodegaEliminar
        ),
        bodegaEliminar: null,
      };
    case OBTENER_BODEGA_ELIMINAR:
      return {
        ...state,
        bodegaEliminar: action.payload,
      };

    default:
      return state;
  }
};
