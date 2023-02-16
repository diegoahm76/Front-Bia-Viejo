import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
// Types
import { AxiosError, AxiosResponse } from "axios";
// Reducers
// Interfaces
import { getSeriesService } from '../series/SeriesServices';
import { getSubSeriesService } from '../subseries/SubSeriesServices';
import { getTDRCurrent, getTDRS } from '../../store/slices/TDR/indexTDR';

const notificationError = (message = 'Algo pasó, intente de nuevo', text = '') => Swal.mixin({
    position: 'center',
    icon: 'error',
    title: message,
    text: text,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
}).fire();

const notificationSuccess = (message = 'Proceso Exitoso', text = '') => Swal.mixin({
    position: 'center',
    icon: 'success',
    title: message,
    text: text,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
}).fire();

//Obtener TRD's terminados
export const getFinishedTRDService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get('gestor/trd/get-terminados/');
            // dispatch(getMoldOrganigrams(data.data));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Obtener lista de TRD's
export const getTRDService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get('gestor/trd/get-list/');
            dispatch(getTDRS(data.data));
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

//Confirmar cambios de un TRD actual
export const confirmChangesCCDSService = (setFlagBtnFinish) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { TDRCurrent } = getState().TRD;
        try {
            const { data } = await clienteAxios.put(`gestor/trd/confirmar-cambios/${TDRCurrent.id_ccd}/`);
            // dispatch(getTRDService());
            // setFlagBtnFinish(false);
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Finalizar Cuadro de Clasificación Documental
export const toFinishedTDRSService = (setFlagBtnFinish) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { TDRCurrent } = getState().TRD;
        try {
            const { data } = await clienteAxios.put(`gestor/trd/finish/${TDRCurrent.id_ccd}/`);
            dispatch(getTRDService());
            notificationSuccess(data.detail);
            setFlagBtnFinish(true);
            return data;
        } catch (error: any) {
            console.log(error.response.data)
            if (error.response.data.delete === true) {
                Swal.fire({
                    title: '¿Está seguro de finalizar el TRD?',
                    text: error.response.data.detail + ", Estas son las faltanes: " + error.response.data.data.map((item: any) => item).join(', ') + ". Las podemos eliminar del sistema",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, finalizar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        clienteAxios.put(`gestor/ccd/finish/${TDRCurrent.id_ccd}/?confirm=true`)
                            .then((response) => {
                                notificationSuccess(response.data.detail);
                                dispatch(getTRDService());
                                dispatch(getSeriesService())
                                dispatch(getSubSeriesService())
                                setFlagBtnFinish(true);
                            })
                            .catch((error) => {
                                notificationError(error.response.data.detail);
                            })
                    }
                })
            } else {
                notificationError(error.response.data.detail, 'Estas son las faltanes: ' + error.response.data.data.map((item: any) => item).join(', '));
            }
            return error as AxiosError;
        };
    };
};


//Crear Tabla Retención Documental (TRD)
export const createCCDSService = (TRD, setSaveCCD) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post("gestor/trd/create/", TRD);
            dispatch(getTDRCurrent(data.data));
            notificationSuccess(data.detail);
            setSaveCCD(true);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
//Actualizar Tabla Retención Documental (TRD
export const updateCCDSService = (TRD) => {
    return async (dispatch, getState): Promise<AxiosResponse | AxiosError> => {
        const { TDRCurrent } = getState().TRD;
        try {
            const { data } = await clienteAxios.patch(`gestor/trd/update/${TDRCurrent.id_ccd}/`, TRD);
            // console.log({ ...TDRCurrent, nombre: TRD.nombre, version: TRD.version }, 'holi');
            dispatch(getTDRCurrent({ ...TDRCurrent, nombre: TRD.nombre, version: TRD.version }));
            notificationSuccess(data.detail);
            return data;
        } catch (error: any) {
            notificationError(error.response.data.detail);
            return error as AxiosError;
        }
    };
};