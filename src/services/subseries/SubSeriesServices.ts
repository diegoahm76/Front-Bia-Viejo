import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
import { NavigateFunction } from 'react-router-dom';
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
import { currentOrganigram, getLevels, getMoldOrganigrams, getOrganigrams, getUnitys } from "../../store/slices/organigrama/indexOrganigram";
// Interfaces
import { FormValuesUnitys, IObjCreateOrganigram, IObjLevels } from '../../Interfaces/Organigrama';
import { ISubSeriesObject } from '../../Interfaces/CCD';
import { getSubSeriesCCD } from '../../store/slices/subSeries/indexSubSeries';

// const notificationError = (message = 'Algo pasó, intente de nuevo') => Swal.mixin({
//     position: 'center',
//     icon: 'error',
//     title: message,
//     showConfirmButton: true,
//     confirmButtonText: 'Aceptar',
// }).fire();

// const notificationSuccess = (message = 'Proceso Exitoso') => Swal.mixin({
//     position: 'center',
//     icon: 'success',
//     title: message,
//     showConfirmButton: true,
//     confirmButtonText: 'Aceptar',
// }).fire();

//Consulta subseries documentales
export const getSubSeriesService = () => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { CCDCurrent } = getState().CCD;
        try {
            const { data } = await clienteAxios.get(`gestor/ccd/subseries/get-by-id/${CCDCurrent.id_ccd}/`);
            dispatch(getSubSeriesCCD(data.data));
            // notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            // notificationError(error.response.data.detail);
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