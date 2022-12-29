import Swal from 'sweetalert2'
import clienteAxios from '../../config/clienteAxios';
// Types
import { AxiosError, AxiosResponse } from 'axios';
// Reducers

// Interfaces
import { getCvArticles, getCvComputers, getCvMaintenance } from '../../store/slices/cv/indexCv';
import { StyleSheet } from '@react-pdf/renderer';

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

//Obtener Mantenimientos
export const getCvMaintenanceService = (id_articulo: number) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/mantenimientos/programados/get-five-list/${id_articulo}/`);
            dispatch(getCvMaintenance(data.detail));
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};

//Obtener Artculo por nombre o codigo
export const getCvArticleAllService = (serial: string, nombre: string, cod_tipo_activo: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/bienes/catalogo-bienes/get-by-nombre-nroidentificador/?cod_tipo_activo=${cod_tipo_activo}&nombre=${nombre}&doc_identificador_nro=${serial}`);
            dispatch(getCvArticles(data.Elementos));
            // notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            // notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Obtener Hoja de Vida PC
export const getCvComputersService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/bienes/catalogo-bienes/get-by-nro-identificador/?cod_tipo_activo=Com&doc_identificador_nro=${id}`);
            dispatch(getCvComputers(data.Elementos));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Crear Hoja de Vida PC
export const createCvComputersService = (formdata: any) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post('almacen/hoja-de-vida/computadores/create/', formdata);
            notificationSuccess(data.detail);
            dispatch(getCvComputers(null));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Actualizar Hoja de Vida PC
export const updateCvComputersService = (id: string, file: any) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        const formdata = new FormData()
        formdata.append('sistema_operativo', id);
        formdata.append('suite_ofimatica', id);
        formdata.append('antivirus', id);
        formdata.append('color', id);
        formdata.append('tipo_de_equipo', id);
        formdata.append('tipo_almacenamiento', id);
        formdata.append('capacidad_almacenamiento', id);
        formdata.append('procesador', id);
        formdata.append('memoria_ram', id);
        formdata.append('observaciones_adicionales', id);
        formdata.append('otras_aplicaciones', id);
        formdata.append('id_articulo', id);
        formdata.append('ruta_imagen_foto', file);
        try {
            const { data } = await clienteAxios.put(`almacen/hoja-de-vida/computadores/update/${id}/`, formdata);
            dispatch(getCvComputersService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Eliminar Hoja de Vida PC
export const deleteCvComputersService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.delete(`almacen/hoja-de-vida/computadores/delete/${id}/`);
            dispatch(getCvComputersService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};