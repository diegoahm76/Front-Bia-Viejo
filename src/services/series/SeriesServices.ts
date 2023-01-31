import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
import { NavigateFunction } from 'react-router-dom';
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
import { currentOrganigram, getLevels, getMoldOrganigrams, getOrganigrams, getUnitys } from "../../store/slices/organigrama/indexOrganigram";
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

//Consulta series documentales
export const getSubSeriesService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get('gestor/ccd/series/get/2/');
            // dispatch(getMoldOrganigrams(data.data));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


//Crear, actualizar y/o eliminar series
export const createSubSeriesService = (id: string, navigate: NavigateFunction) => {
    // [
    //     {
    //         "id_subserie_doc":null,
    //         "nombre": "Subserie 105",
    //         "codigo": 756,
    //         "id_ccd": 2
    //     }
    // ]
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.put(`gestor/ccd/series/update/2/`);
            // dispatch(getOrganigramsService());
            notificationSuccess(data.detail);
            // navigate('/dashboard/gestordocumental/organigrama/crearorganigrama');
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};