import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
import { NavigateFunction } from 'react-router-dom';
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
import { currentOrganigram, getLevels, getMoldOrganigrams, getOrganigrams, getUnitys } from "../../store/slices/organigrama/indexOrganigram";
// Interfaces
import { FormValuesUnitys, IObjCreateOrganigram, IObjLevels } from '../../Interfaces/Organigrama';
import { getAssignmentsCCD } from '../../store/slices/assignments/indexAssignments';

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
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.get(`gestor/ccd/asignar/get/${CCDCurrent.id_ccd}/`);
            dispatch(getAssignmentsCCD(data.data));
            // notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            // notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


//Asignar series y subseries a unidades documentales
export const createAssignmentsService = (newItem, clean) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        console.log(newItem, 'newItem')
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/asignar/create/${CCDCurrent.id_ccd}/`, newItem);
            dispatch(getAssignmentsService());
            notificationSuccess(data.detail);
            clean();
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};