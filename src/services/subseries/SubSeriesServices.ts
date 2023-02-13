import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers

// Interfaces
import { ISubSeriesObject } from '../../Interfaces/CCD';
import { getSubSeriesCCD } from '../../store/slices/subSeries/indexSubSeries';

//Consulta subseries documentales
export const getSubSeriesService = () => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.get(`gestor/ccd/subseries/get-by-id/${CCDCurrent.id_ccd}/`);
            dispatch(getSubSeriesCCD(data.data));
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};


//Crear, actualizar y/o eliminar subseries
export const createSubSeriesService = (newSubSeries: ISubSeriesObject[], clean: () => void) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        const elementModalId = document.getElementById("modal-serie-subserie-id")!;
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/subseries/update/${CCDCurrent.id_ccd}/`, newSubSeries);
            dispatch(getSubSeriesService());
            clean();
            Swal.fire({
                target: elementModalId,
                position: "center",
                icon: "success",
                title: data.detail,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                timer: 2000,
            });
            return data;
        } catch (error: any) {
            Swal.fire({
                target: elementModalId,
                position: "center",
                icon: "error",
                title: error.response.data.detail,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                timer: 2000,
            });
            return error as AxiosError;
        }
    };
};