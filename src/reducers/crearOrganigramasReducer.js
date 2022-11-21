import {
    AGREGAR_ORGANIGRAMA,
    AGREGAR_ORGANIGRAMA_ERROR,
    AGREGAR_ORGANIGRAMA_EXITO,
    EDITAR_ORGANIGRAMA,
    EDITAR_ORGANIGRAMA_OBTENER,
    EDITAR_ORGANIGRAMA_ERROR,
    EDITAR_ORGANIGRAMA_EXITO,
    ELIMINAR_OBTENER_ORGANIGRAMA,
    ELIMINAR_ORGANIGRAMA,
    ELIMINAR_ORGANIGRAMA_ERROR,
    ELIMINAR_ORGANIGRAMA_EXITO,
    DESCARGAR_ORGANIGRAMA,
    DESCARGAR_ORGANIGRAMA_ERROR,
    DESCARGAR_ORGANIGRAMA_EXITO,
} from "../types/crearOrganigramasTypes";

const initialState = {
    organigrama: [],
    // versiones: [],
    user: {},
    loading: false,
    error: null,
};

export const crearOrganigramaReducer = (state = initialState, action) => {
    switch (action.type) {
        case AGREGAR_ORGANIGRAMA:
        case DESCARGAR_ORGANIGRAMA:
            return {
                ...state,
                loading: action.payload,
            }
        case AGREGAR_ORGANIGRAMA_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                organigrama: [...state.organigrama, action.payload],
                // user: action.payload,

            };

        case AGREGAR_ORGANIGRAMA_ERROR:
        case DESCARGAR_ORGANIGRAMA_ERROR:
        case ELIMINAR_ORGANIGRAMA_ERROR:
        // case EDITAR_ORGANIGRAMA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                organigramaEliminar: null,
            }
        
        case ELIMINAR_ORGANIGRAMA:
            return {
                ...state,
                organigramaEliminar: action.payload,
            };
        
        case ELIMINAR_ORGANIGRAMA_EXITO:
            return {
                ...state,
                organigrama: state.organigrama.filter(
                    (organigrama) => organigrama.objectid !== state.organigramaEliminar
                ),
                organigramaEliminar: null,
            }
        
        case DESCARGAR_ORGANIGRAMA_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                usuarios: action.payload,
            };
        case ELIMINAR_OBTENER_ORGANIGRAMA:
            return {
                ...state,
                organigramaEliminar: action.payload
            };
    }
};