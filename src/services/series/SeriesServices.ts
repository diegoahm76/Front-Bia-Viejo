import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
import { getSeriesCCD } from '../../store/slices/series/indexSeries';
// Interfaces
import { ISeriesObject } from '../../Interfaces/CCD';

//Consulta series documentales
export const getSeriesService = () => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.get(`gestor/ccd/series/get/${CCDCurrent.id_ccd}/`);
            dispatch(getSeriesCCD(data.data));
            // notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            // notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


//Crear, actualizar y/o eliminar series
export const createSeriesService = (newSeries: ISeriesObject[], clean: () => void) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        const elementModalId = document.getElementById("modal-serie-subserie-id")!;
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/series/update/${CCDCurrent.id_ccd}/`, newSeries);
            dispatch(getSeriesService());
            clean();
            Swal.fire({
                target: elementModalId,
                position: "center",
                icon: "success",
                title: data.detail,
                showConfirmButton: false,
                timer: 2000,
            });
            return data;
        } catch (error: any) {
            Swal.fire({
                target: elementModalId,
                position: "center",
                icon: "error",
                title: error.response.data.detail,
                showConfirmButton: false,
                timer: 2000,
            });
            return error as AxiosError;
        }
    };
};