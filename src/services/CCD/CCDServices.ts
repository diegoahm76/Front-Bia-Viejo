import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
// Interfaces
import { getCCDCurrent, getCCDS } from '../../store/slices/CCD/indexCCD';
import { getSeriesService } from '../series/SeriesServices';
import { getSubSeriesService } from '../subseries/SubSeriesServices';

const notificationError = (message = 'Algo pasó, intente de nuevo', text = '') => Swal.mixin({
    position: 'center',
    icon: 'error',
    title: message,
    text: text,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
}).fire();

const notificationSuccess = (message = 'Proceso Exitoso', text = '') => Swal.mixin({
    position: 'center',
    icon: 'success',
    title: message,
    text: text,
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
            dispatch(getCCDS(data.data));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Reanudar Cuadro de Clasificación Documental
export const toResumeCCDSService = (setFlagBtnFinish) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/resume/${CCDCurrent.id_ccd}/`);
            dispatch(getClassificationCCDSService());
            setFlagBtnFinish(false);
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Finalizar Cuadro de Clasificación Documental
export const toFinishedCCDSService = (setFlagBtnFinish) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/finish/${CCDCurrent.id_ccd}/?confirm=false`);
            dispatch(getClassificationCCDSService());
            notificationSuccess(data.detail);
            setFlagBtnFinish(true);
            return data;
        } catch (error: any) {
            console.log(error.response.data)
            if (error.response.data.delete === true) {
                Swal.fire({
                    title: '¿Está seguro de finalizar el CCD?',
                    text: error.response.data.detail + ", Estas son las faltanes: " + error.response.data.data.map((item: any) => item).join(', ') + ". Las podemos eliminar del sistema",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, finalizar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        clienteAxios.put(`gestor/ccd/finish/${CCDCurrent.id_ccd}/?confirm=true`)
                            .then((response) => {
                                notificationSuccess(response.data.detail);
                                dispatch(getClassificationCCDSService());
                                dispatch(getSeriesService())
                                dispatch(getSubSeriesService())
                                setFlagBtnFinish(true);
                            })
                            .catch((error) => {
                                notificationError(error.response.data.detail);
                            })
                    }
                })
            } else {
                notificationError(error.response.data.detail, 'Estas son las faltanes: ' + error.response.data.data.map((item: any) => item).join(', '));
            }
            return error as AxiosError;
        };
    };
};


//Crear Cuadro de Clasificación Documental (CCD)
export const createCCDSService = (CCD, setSaveCCD) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post("gestor/ccd/create/", CCD);
            dispatch(getCCDCurrent(data.data));
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