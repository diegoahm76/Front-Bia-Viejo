import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
import { NavigateFunction } from 'react-router-dom';
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
// Interfaces
import { FormValuesUnitys, IObjCreateOrganigram, IObjLevels } from '../../Interfaces/Organigrama';
import { getCCDCurrent, getCCDS } from '../../store/slices/CCD/indexCCD';

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
export const toResumeCCDSService = (id: string, navigate: NavigateFunction) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/resume/${CCDCurrent.id_ccd}/`);
            dispatch(getClassificationCCDSService());
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Finalizar Cuadro de Clasificación Documental
export const toFinishedCCDSService = () => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/finish/${CCDCurrent.id_ccd}/?confirm=false`);
            dispatch(getClassificationCCDSService());
            // notificationSuccess(data.detail, 'Los siguientes códigos no se encontraron en el sistema: ' + data.data.map((item: any) => item).join(', '));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            console.log(error.response.data)
            if (error.response.data.delete === false) {
                Swal.fire({
                    title: '¿Está seguro de finalizar el CCD?',
                    text: "Estas son las faltanes: " + error.response.data.data.map((item: any) => item).join(', ') + " las podemos eliminar del sistema",
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