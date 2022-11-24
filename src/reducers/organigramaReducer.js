import {
  AGREGAR_ORGANIGRAMA,
  AGREGAR_ORGANIGRAMA_ERROR,
  AGREGAR_ORGANIGRAMA_EXITO,
  EDITAR_ORGANIGRAMA,
  EDITAR_ORGANIGRAMA_OBTENER,
  EDITAR_ORGANIGRAMA_ERROR,
  EDITAR_ORGANIGRAMA_EXITO,
  ELIMINAR_ORGANIGRAMA,
  ELIMINAR_ORGANIGRAMA_ERROR,
  ELIMINAR_ORGANIGRAMA_EXITO,
  DESCARGAR_ORGANIGRAMA,
  DESCARGAR_ORGANIGRAMA_ERROR,
  DESCARGAR_ORGANIGRAMA_EXITO,
  OBTENER_NIVELES_ORGANIGRAMA_OBTENER,
  OBTENER_NIVELES_ORGANIGRAMA_ERROR,
} from "../types/organigramaTypes";

const initialState = {
  organigrama: [],
  loading: false,
  error: null,
  organigramaEliminar: null,
  organigramaEditar: null,
  nivelesOrganigrama: []
};

export const organigramaReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGREGAR_ORGANIGRAMA:
    case DESCARGAR_ORGANIGRAMA:
      return {
        ...state,
        loading: action.payload,
      };

    case AGREGAR_ORGANIGRAMA_ERROR:
    case DESCARGAR_ORGANIGRAMA_ERROR:
    case ELIMINAR_ORGANIGRAMA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        organigramaEliminar: null,
      };
    case DESCARGAR_ORGANIGRAMA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        organigrama: action.payload,
      };

    case ELIMINAR_ORGANIGRAMA:
      return {
        ...state,
        organigramaEliminar: action.payload,
      };

    case ELIMINAR_ORGANIGRAMA_EXITO:
      return {
        ...state,
        organigrama: state.organigrama.filter(
          (organigrama) =>
            organigrama.id_organigrama !== state.organigramaEliminar
        ),
        organigramaEliminar: null,
      };

    case EDITAR_ORGANIGRAMA_OBTENER:
      return {
        ...state,
        organigramaEditar: action.payload,
      };
    case OBTENER_NIVELES_ORGANIGRAMA_OBTENER:
      return {
        ...state,
        nivelesOrganigrama: action.payload
      };
    case OBTENER_NIVELES_ORGANIGRAMA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        nivelesOrganigrama: [],
      };
    default:
      return state;
  }
};
