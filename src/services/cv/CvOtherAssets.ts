import Swal from 'sweetalert2'
import clienteAxios from '../../config/clienteAxios';
// Types
import { AxiosError, AxiosResponse } from 'axios';
// Reducers
import { getCvOtherAssets, getCvVehicles } from '../../store/slices/cv/indexCv';
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

//Obtener Otros Activos por nombre o codigo
export const getCvVehiclesService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/bienes/catalogo-bienes/get-by-nro-identificador/?cod_tipo_activo=OAc&doc_identificador_nro=${id}`);
            dispatch(getCvVehicles(data.Elementos));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Obtener Hoja de Vida Otros Activos
export const getCvOtherAssetsService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/bienes/catalogo-bienes/get-by-nro-identificador/?cod_tipo_activo=OAc&doc_identificador_nro=${id}`);
            dispatch(getCvOtherAssets(data.Elementos));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Crear Hoja de Vida Otros Activos
export const createCvOtherAssetsService = (formdata: any) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post('almacen/hoja-de-vida/otros/create/', formdata);
            notificationSuccess(data.detail);
            dispatch(getCvOtherAssets(null));
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
            dispatch(getCvVehiclesService(id));
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
            dispatch(getCvVehiclesService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};