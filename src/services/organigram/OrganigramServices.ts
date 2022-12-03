import Swal from 'sweetalert2'
import clienteAxios from "../../config/clienteAxios";
import { AxiosError, AxiosResponse } from "axios";
import { addOrganigrams, getOrganigrams } from "../../store/slices/organigrama/indexOrganigram";
import { IObjOrganigram } from '../../Interfaces/Organigrama';
import { NavigateFunction } from 'react-router-dom';

//Obtener Organigrama
export const getOrganigramsService = () => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.get("almacen/organigrama/get/");
            dispatch(getOrganigrams(data.Organigramas));
            // Swal.fire("Correcto", "El organigrama se agrego correctamente", "success");
            return data;
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo pasó, intente de nuevo",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
            });
            return error as AxiosError;
        }
    };
};
//Agregar Organigrama
export const addOrganigramsService = (organigrama: IObjOrganigram, navigate: NavigateFunction) => {
    return async (dispatch): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await clienteAxios.post("almacen/organigrama/create/", organigrama);
            dispatch(addOrganigrams(organigrama));
            Swal.fire("Correcto", "El organigrama se agrego correctamente", "success");
            return data;
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo pasó, intente de nuevo",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
            });
            navigate('/dashboard/gestordocumental/organigrama/crearorganigrama')
            return error as AxiosError;
        }
    };
};