import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
import { getSeriesCCD } from '../../store/slices/series/indexSeries';
// Interfaces
import { ISeriesObject } from '../../Interfaces/CCD';

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

//Consulta series documentales
export const getSeriesService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get('gestor/ccd/series/get/2/');
            dispatch(getSeriesCCD(data.data));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


//Crear, actualizar y/o eliminar series
export const createSeriesService = (newSeries: ISeriesObject) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/series/update/2/`, newSeries);
            dispatch(getSeriesService());
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};