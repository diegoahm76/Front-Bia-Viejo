import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { crearAlarmaAction, editarAlarmaAction, obtenerAlarmaEditAction } from "./indexAlarma";

export const crearAlarma = async (dispatch, dataAlarma) => {
    await clienteEstaciones.post("Alarmas", dataAlarma).then((res) => {
        dispatch(crearAlarmaAction(dataAlarma));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Alarma agreada correctamente",
            showConfirmButton: false,
            timer: 2000,
        }).catch((err) => {
            if (err.response?.data) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: err.response.data,
                    showConfirmButton: true,
                    confirmButtonText: "Aceptar",
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Algo pasó, intente de nuevo",
                    showConfirmButton: true,
                    confirmButtonText: "Aceptar",
                });
            }
        });
    });
}
export const obtenerAlarmaEdit = async (dispatch, objectid: string) => {
    await clienteEstaciones.get(`Alarmas/${objectid}`)
        .then((res) => {
            dispatch(obtenerAlarmaEditAction(res.data));
        }).catch(() => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo pasó, intente de nuevo",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
            });
        });
}

export const editarAlarma = async (dispatch, dataEdit) => {
    await clienteEstaciones.put("Alarmas", dataEdit).then(() => {
        dispatch(editarAlarmaAction(dataEdit));
        // REVISAR GET ALARMA EDIT  
        // dispatch(obternerAlarmasAction());
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Alarma actualizada correctamente",
            showConfirmButton: false,
            timer: 2000,
        });
    }).catch(() => {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo pasó, intente de nuevo",
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        });
    });
}