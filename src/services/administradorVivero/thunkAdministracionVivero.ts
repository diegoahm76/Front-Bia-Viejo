import clienteAxios from '../../config/clienteAxios';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import { crearViveroAction, obtenerViveroAction } from '../../store/slices/administradorViveros/indexAdministradorViveros';


const notificationSuccess = (message = 'Proceso Exitoso') => Swal.mixin({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
}).fire();

const notificationError = (message = 'Algo pasó, intente de nuevo') => Swal.mixin({
    position: 'center',
    icon: 'error',
    title: message,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
}).fire();


export const createThunkAdministracionVivero = (formdata: any) => {
    return async(dispatch) => {
        try {
            const { data } = await clienteAxios.post('conservacion/viveros/create/', formdata);
            notificationSuccess(data.detail);
            // dispatch(crearViveroAction(data));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    }
}

export const editThunkAdministracionVivero = (id, formdata) => {
    return async(dispatch) => {
        const { data } = await clienteAxios.put(`https://backend-bia-beta-production.up.railway.app/api/conservacion/viveros/update/${id}/`, formdata);
        try {
            notificationSuccess(data.detail);
            console.log(data);
            return data
        } catch (error:any) {
            notificationError(error.response.data.detail);
            return error as AxiosError
        }
    }
}

export const getThunkAdministracionVivero = () => {
    return async(dispatch) => {
        try {
            const { data } = await clienteAxios.get(`https://backend-bia-beta-production.up.railway.app/api/conservacion/viveros/get-by-nombre-municipio/`);
            console.log(data);
            // dispatch(obtenerViveroAction(data));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
        }
    }
}