import Swal from 'sweetalert2'
import clienteAxios from '../../config/clienteAxios';
// Types
import { AxiosError, AxiosResponse } from 'axios';
// Reducers
import { getCvOtherAssets } from '../../store/slices/cv/indexCv';
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

//Obtener Hoja de Vida Otros Activos
export const getCvOtherAssetsService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`almacen/hoja-de-vida/otros/get-by-id/${id}/`);
            dispatch(getCvOtherAssets(data.data));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Crear Hoja de Vida Otros Activos
export const createCvOtherAssetsService = (file: any, id: any) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        const formdata = new FormData()
        formdata.append('ruta_imagen_foto', file);
        formdata.append('id_articulo', id);
        try {
            const { data } = await clienteAxios.post('almacen/hoja-de-vida/otros/create/', formdata);
            dispatch(getCvOtherAssetsService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Actualizar Hoja de Vida Otros Activos
export const updateCvOtherAssetsService = (id: any, file: any) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        const formdata = new FormData()
        formdata.append('caracteristicas_fisicas', id);
        formdata.append('especificaciones_tecnicas', id);
        formdata.append('observaciones_adicionales', id);
        formdata.append('ruta_imagen_foto', file);
        try {
            const { data } = await clienteAxios.put(`almacen/hoja-de-vida/otros/update/${id}/`, formdata);
            dispatch(getCvOtherAssetsService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Eliminar Hoja de Vida Otros Activos
export const deleteCvOtherAssetsService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.delete(`almacen/hoja-de-vida/otros/delete/${id}/`);
            dispatch(getCvOtherAssetsService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};