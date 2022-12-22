import Swal from 'sweetalert2'
import clienteAxios from '../../config/clienteAxios';
// Types
import { AxiosError, AxiosResponse } from 'axios';
// Reducers
import { getCvComputers, getCvMaintenance } from '../../store/slices/cv/indexCv';
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

//Obtener Mantenimientos
export const getCvMaintenanceService = (id_articulo: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/mantenimientos/programados/get-five-list/${id_articulo}/`);
            dispatch(getCvMaintenance(data.data));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Obtener Hoja de Vida Vehiculos
export const getCvComputersService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/hoja-de-vida/computadores/get-by-id/${id}/`);
            dispatch(getCvComputers(data.data));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Crear Hoja de Vida Vehiculos
export const createCvVehiclesService = (file: any, id: string) => {
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
            const { data } = await clienteAxios.post('almacen/hoja-de-vida/computadores/create/', formdata);
            dispatch(getCvComputersService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Actualizar Hoja de Vida Vehiculos
export const updateCvVehiclesService = (id: string, file: any) => {
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
//Eliminar Hoja de Vida Vehiculos
export const deleteCvVehiclesService = (id: string) => {
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