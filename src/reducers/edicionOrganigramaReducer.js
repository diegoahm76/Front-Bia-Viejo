import {
    EDITAR_NIVEL_ORGANIZACIONAL,
    EDITAR_NIVEL_ORGANIZACIONAL_OBTENER,
    EDITAR_NIVEL_ORGANIZACIONAL_EXITO,
    EDITAR_NIVEL_ORGANIZACIONAL_ERROR,
    EDITAR_UNIDAD_ORGANIZACIONAL,
    EDITAR_UNIDAD_ORGANIZACIONAL_OBTENER,
    EDITAR_UNIDAD_ORGANIZACIONAL_EXITO,
    EDITAR_UNIDAD_ORGANIZACIONAL_ERROR,
    AGREGAR_NIVEL_ORGANIZACIONAL,
    AGREGAR_NIVEL_ORGANIZACIONAL_ERROR,
    AGREGAR_NIVEL_ORGANIZACIONAL_EXITO,
    AGREGAR_UNIDAD_ORGANIZACIONAL,
    AGREGAR_UNIDAD_ORGANIZACIONAL_ERROR,
    AGREGAR_UNIDAD_ORGANIZACIONAL_EXITO,
    ELIMINAR_NIVEL_ORGANIZACIONAL,
    ELIMINAR_NIVEL_ORGANIZACIONAL_ERROR,
    ELIMINAR_NIVEL_ORGANIZACIONAL_EXITO,
    ELIMINAR_UNIDAD_ORGANIZACIONAL,
    ELIMINAR_UNIDAD_ORGANIZACIONAL_ERROR,
    ELIMINAR_UNIDAD_ORGANIZACIONAL_EXITO,
    DESCARGAR_NIVEL_ORGANIZACIONAL,
    DESCARGAR_NIVEL_ORGANIZACIONAL_ERROR,
    DESCARGAR_NIVEL_ORGANIZACIONAL_EXITO,
    DESCARGAR_UNIDAD_ORGANIZACIONAL,
    DESCARGAR_UNIDAD_ORGANIZACIONAL_ERROR,
    DESCARGAR_UNIDAD_ORGANIZACIONAL_EXITO,
} from "../types/edicionOrganigramaTypes";

const initialState = {
    nivel: [],
    unidades: [],
    loading: false,
    error: null,
    nivelEliminar: null,
    unidadEliminar: null,
};

export const edicionOrganigramaReducer = (state = initialState, action) => {
    switch (action.type) {
        case AGREGAR_NIVEL_ORGANIZACIONAL:
        case AGREGAR_UNIDAD_ORGANIZACIONAL:
        case DESCARGAR_NIVEL_ORGANIZACIONAL:
        case DESCARGAR_UNIDAD_ORGANIZACIONAL:
            return {
                ...state,
                loading: action.payload,
            };
        case EDITAR_NIVEL_ORGANIZACIONAL_ERROR:
        case EDITAR_UNIDAD_ORGANIZACIONAL_ERROR:
        case AGREGAR_NIVEL_ORGANIZACIONAL_ERROR:
        case AGREGAR_UNIDAD_ORGANIZACIONAL_ERROR:
        case ELIMINAR_NIVEL_ORGANIZACIONAL_ERROR:
        case ELIMINAR_UNIDAD_ORGANIZACIONAL_ERROR:
        case DESCARGAR_NIVEL_ORGANIZACIONAL_ERROR:
        case DESCARGAR_UNIDAD_ORGANIZACIONAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                nivelEliminar: null,
                unidadEliminar: null,
            };
        case ELIMINAR_NIVEL_ORGANIZACIONAL:
            return {
                ...state,
                nivelEliminar: action.payload,
            };
        case ELIMINAR_UNIDAD_ORGANIZACIONAL:
            return {
                ...state,
                unidadEliminar: action.payload,
            };
        case ELIMINAR_NIVEL_ORGANIZACIONAL_EXITO:
            return {
                ...state,
                nivel: state.nivel.filter(
                    (nivel) =>
                        nivel.id_organigrama !== state.nivelEliminar
                ),
                nivelEliminar: null,
            };
        case ELIMINAR_UNIDAD_ORGANIZACIONAL_EXITO:
            return {
                ...state,
                unidades: state.unidades.filter(
                    (unidades) =>
                        unidades.id_organigrama !== state.unidadEliminar
                ),
                unidadEliminar: null,
            };
        case DESCARGAR_NIVEL_ORGANIZACIONAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                nivel: action.payload,
            };
        case DESCARGAR_UNIDAD_ORGANIZACIONAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                unidades: action.payload,
            };
        case AGREGAR_NIVEL_ORGANIZACIONAL_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                nivel: [...state.nivel, action.payload],
            };
        default:
            return state;
    }
};