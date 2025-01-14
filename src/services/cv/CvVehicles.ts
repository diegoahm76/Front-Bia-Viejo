import Swal from 'sweetalert2'
import clienteAxios from '../../config/clienteAxios';
// Types
import { AxiosError, AxiosResponse } from 'axios';
// Reducers
import { getCvVehicles } from '../../store/slices/cv/indexCv';

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

//Obtener Vehiculos Vehiculos
export const getCvVehiclesService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get(`almacen/bienes/catalogo-bienes/get-by-nro-identificador/?cod_tipo_activo=Veh&doc_identificador_nro=${id}`);
            dispatch(getCvVehicles(data.Elementos));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Crear Vehiculos Vehiculos
export const createCvVehiclesService = (formdata: any) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post('almacen/hoja-de-vida/vehiculos/create/', formdata);
            notificationSuccess(data.detail);
            dispatch(getCvVehicles(null));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Actualizar Vehiculos Vehiculos
export const updateCvVehiclesService = (id: string, file: any) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        const formdata = new FormData()
        formdata.append('cod_tipo_vehiculo', id);
        formdata.append('tiene_platon', id);
        formdata.append('capacidad_pasajeros', id);
        formdata.append('color', id);
        formdata.append('linea', id);
        formdata.append('tipo_combustible', id);
        formdata.append('es_arrendado', id);
        formdata.append('ultimo_kilometraje', id);
        formdata.append('fecha_adquisicion', id);
        formdata.append('fecha_vigencia_garantia', id);
        formdata.append('numero_motor', id);
        formdata.append('numero_chasis', id);
        formdata.append('cilindraje', id);
        formdata.append('transmision', id);
        formdata.append('dimesion_llantas', id);
        formdata.append('capacidad_extintor', id);
        formdata.append('tarjeta_operacion', id);
        formdata.append('observaciones_adicionales', id);
        formdata.append('es_agendable', id);
        formdata.append('en_circulacion', id);
        formdata.append('fecha_circulacion', id);
        formdata.append('ruta_imagen_foto', file);
        try {
            const { data } = await clienteAxios.put(`almacen/hoja-de-vida/vehiculos/update/${id}/`, formdata);
            dispatch(getCvVehiclesService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Eliminar Vehiculos Vehiculos
export const deleteCvVehiclesService = (id: string) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.delete(`almacen/hoja-de-vida/vehiculos/delete/${id}/`);
            dispatch(getCvVehiclesService(id));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};