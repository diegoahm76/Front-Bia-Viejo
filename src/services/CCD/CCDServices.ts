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
            const { data } = await clienteAxios.get('gestor/ccd/get-list/?pk=1');
            // dispatch(getMoldOrganigrams(data.data));
            notificationSuccess(data.detail);
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
            // navigate('/dashboard/gestordocumental/organigrama/crearorganigrama');
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
            // navigate('/dashboard/gestordocumental/organigrama/crearorganigrama');
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


//Crear Cuadro de Clasificación Documental (CCD)
export const createCCDSService = (CCD: IObjCreateOrganigram, navigate: NavigateFunction) => {
    // {
    //     "id_organigrama": 1,
    //     "version": "5.0",
    //     "nombre": "CCD 5"
    // }
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post("gestor/ccd/create/", CCD);
            // dispatch(getOrganigramsService());
            dispatch(currentOrganigram(data.detail));
            notificationSuccess(data.detail);
            navigate('/dashboard/gestordocumental/organigrama/edicion-organigrama')
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            navigate('/dashboard/gestordocumental/organigrama/crearorganigrama')
            return error as AxiosError;
        }
    };
};
//Update Cuadro de Clasificación Documental
export const editOrganigramsService = (CCD: IObjCreateOrganigram, id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.patch(`gestor/ccd/update/2/`, CCD);
            // dispatch(getOrganigramsService());
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};