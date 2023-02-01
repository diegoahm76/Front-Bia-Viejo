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
    position: 'center',
    icon: 'error',
    title: message,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
}).fire();

const notificationSuccess = (message = 'Proceso Exitoso') => Swal.mixin({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
}).fire();

//Obtiene ccd tabla intermedia
export const getAssignmentsService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get('gestor/ccd/asignar/get/1/');
            // dispatch(getMoldOrganigrams(data.data));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


//Asignar series y subseries a unidades documentales
export const createAssignmentsService = (id: string, navigate: NavigateFunction) => {
    // [
    //     {
    //         "id_unidad_organizacional": 1,
    //         "id_serie_doc": 1,
    //         "subseries": [1]
    //     },
    //     {
    //         "id_unidad_organizacional": 2,
    //         "id_serie_doc": 1,
    //         "subseries": [2]
    //     },
    //     {
    //         "id_unidad_organizacional": 3,
    //         "id_serie_doc": 2,
    //         "subseries": [1]
    //     },
    //     {
    //         "id_unidad_organizacional": 4,
    //         "id_serie_doc": 2,
    //         "subseries": [2]
    //     },
    //     {
    //         "id_unidad_organizacional": 5,
    //         "id_serie_doc": 2,
    //         "subseries": [1, 2]
    //     }
    // ]
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/asignar/create/1/`);
            // dispatch(getOrganigramsService());
            notificationSuccess(data.detail);
            // navigate('/dashboard/gestordocumental/organigrama/crearorganigrama');
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};