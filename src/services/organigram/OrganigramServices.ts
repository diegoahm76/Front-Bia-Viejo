import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
import { NavigateFunction } from 'react-router-dom';
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
import { currentOrganigram, getLevels, getMoldOrganigrams, getOrganigrams, getUnitys } from "../../store/slices/organigrama/indexOrganigram";
// Interfaces
import { FormValuesUnitys, IObjCreateOrganigram, IObjLevels } from '../../Interfaces/Organigrama';

const notificationError = (message = 'Algo pasó, intente de nuevo') => Swal.mixin({
    position: "center",
    icon: "error",
    title: message,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
}).fire();

//Obtener Organigrama
export const getMoldOrganigramsService = (id: string | number | null) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/organigrama/unidades/get-jerarquia/${id}/`);
            dispatch(getMoldOrganigrams(data.data));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Obtener Organigrama
export const getOrganigramsService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get("almacen/organigrama/get/");
            dispatch(getOrganigrams(data.Organigramas));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Agregar Organigrama
export const addOrganigramsService = (organigrama: IObjCreateOrganigram, navigate: NavigateFunction) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post("almacen/organigrama/create/", organigrama);
            dispatch(getOrganigramsService());
            dispatch(currentOrganigram(data.detail));
            Swal.fire("Correcto", "El organigrama se agrego correctamente", "success");
            navigate('/dashboard/gestordocumental/organigrama/edicion-organigrama')
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            navigate('/dashboard/gestordocumental/organigrama/crearorganigrama')
            return error as AxiosError;
        }
    };
};
//Editar Organigrama
export const editOrganigramsService = (organigrama: IObjCreateOrganigram, id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.patch(`almacen/organigrama/update/${id}/`, organigrama);
            dispatch(getOrganigramsService());
            Swal.fire("Correcto", "El organigrama se editó correctamente", "success");
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Finalizar Organigrama
export const toFinalizeOrganigramService = (id: string, navigate: NavigateFunction) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`almacen/organigrama/finalizar/${id}/`);
            dispatch(getOrganigramsService());
            Swal.fire({
                position: "center", icon: "info", title: "Atención", text: data.detail,
            });
            navigate('/dashboard/gestordocumental/organigrama/crearorganigrama');
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Niveles
//Obtener Niveles
export const getLevelsService = (id: string | number | null) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/organigrama/niveles/get-by-organigrama/${id}/`);
            dispatch(getLevels(data.data));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Actualizar Niveles
export const updateLevelsService = (id: string | number | null, newLevels: IObjLevels[]) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`almacen/organigrama/niveles/update/${id}/`, newLevels);
            dispatch(getLevelsService(id));
            Swal.fire("Correcto", "Proceso Exitoso", "success");
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Unidades

//Obtener Unidades
export const getUnitysService = (id: string | number | null) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/organigrama/unidades/get-by-organigrama/${id}/`);
            dispatch(getUnitys(data.data));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Actualizar Unidades
export const updateUnitysService = (id: string | number | null, newUnitys: FormValuesUnitys[], cleanUnitys: () => void) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`almacen/organigrama/unidades/update/${id}/`, newUnitys);
            dispatch(getUnitysService(id));
            Swal.fire("Correcto", "Proceso Exitoso", "success");
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
