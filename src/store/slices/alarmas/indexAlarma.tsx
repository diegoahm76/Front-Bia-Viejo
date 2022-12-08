import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { IAlarmaGet } from "../../../Interfaces/Alarmas";

const initialState: IAlarmaGet = {
    alarma: [],
    alarmaSeleccionada: {
        idAlarma: 0,
        objectid: 0,
        t001Estaciones: {
            objectid: 0,
            t001coord1: 0,
            t001coord2: 0,
            t001fechaMod: "",
            t001nombre: "",
            t001userMod: ""
        },
        t006rango: 0,
        t006mensajeUp: "",
        t006mensajeDown: "",
        t006periodo: "",
        t006periodoBase: "",
        t006tolerancia: "",
        t006periodoDesconexion: ""
    }
};

const alarmaModal = createSlice({
    name: "alarma",
    initialState,
    reducers: {
        obtenerAlarmas: (state, action) => {
            state.alarma = action.payload;
        },
        crearAlarmaAction: (state, action) => {
            // REVISAR
            // state.alarmas.push(action.payload);
        },
        editarAlarmaAction: (state, action) => {

        },
        obtenerAlarmaByIdAction: (state, action) => {

        },
        seleccionarAlarmaModel: (state, action) => {
            state.alarmaSeleccionada = action.payload
        }
    }
})


export const { obtenerAlarmas, crearAlarmaAction, seleccionarAlarmaModel, editarAlarmaAction, obtenerAlarmaByIdAction } = alarmaModal.actions;
export default alarmaModal.reducer

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
            dispatch(obtenerAlarmaByIdAction(res.data));
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

export const seleccionarAlarma = (dispatch, alarma) => {
    dispatch(seleccionarAlarmaModel(alarma))
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

export const obtenerTodasAlarmas = async (dispatch) => {
    await clienteEstaciones.get("Alarmas")
        .then((alarmas) => {
            dispatch(obtenerAlarmas(alarmas.data))
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