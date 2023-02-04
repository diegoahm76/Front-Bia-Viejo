import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
import { NavigateFunction } from 'react-router-dom';
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
// Interfaces
import { FormValuesUnitys, IObjCreateOrganigram, IObjLevels } from '../../Interfaces/Organigrama';
import { getCCDCurrent, getCCDS } from '../../store/slices/CCD/indexCCD';

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

//Obtener los CCDS terminados
export const getFinishedCCDSService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get('gestor/ccd/get-terminados/');
            // dispatch(getMoldOrganigrams(data.data));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Obtener Cuadro de Clasificación Documental
export const getClassificationCCDSService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get('gestor/ccd/get-list');
            dispatch(getCCDS(data['cuadros de Clasificación Documental']));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Reanudar Cuadro de Clasificación Documental
export const toResumeCCDSService = (id: string, navigate: NavigateFunction) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/resume/1/`);
            // dispatch(getOrganigramsService());
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Finalizar Cuadro de Clasificación Documental
export const toFinishedCCDSService = (id: string, navigate: NavigateFunction) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/finish/2/`);
            // dispatch(getOrganigramsService());
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


//Crear Cuadro de Clasificación Documental (CCD)
export const createCCDSService = (CCD, setSaveCCD) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post("gestor/ccd/create/", CCD);
            dispatch(getCCDCurrent(data.detail));
            notificationSuccess(data.detail);
            setSaveCCD(true);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Update Cuadro de Clasificación Documental
export const updateCCDSService = (CCD) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.patch(`gestor/ccd/update/${CCDCurrent.id_ccd}/`, CCD);
            console.log({ ...CCDCurrent, nombre: CCD.nombre, version: CCD.version }, 'holi');
            dispatch(getCCDCurrent({ ...CCDCurrent, nombre: CCD.nombre, version: CCD.version }));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};