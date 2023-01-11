import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";


const initialState = {
    fechas: [],
    kilometros: [],
    articulos: [],
}
const mantenimientoSlice = createSlice({
    name: "mantenimiento",
    initialState,
    reducers: {
        previsualizacionFechas: (state, action) => {
            state.fechas = action.payload;
        },
        previsualizacionKilometros: (state, action) => {
            state.kilometros = action.payload
        },
        getArticulos: (state, action) => {
            state.articulos = action.payload
        }
    },
});

export const { previsualizacionFechas, previsualizacionKilometros, getArticulos } = mantenimientoSlice.actions;
export default mantenimientoSlice.reducer;

export const obtenerArticulos = async (dispatch, tipo, nombre?, documento?) => {

    const name = nombre === undefined ? "" : nombre;
    const codigo = nombre === undefined ? "" : documento;
    const elementModalId = document.getElementById("modalArticulosId")!;
    await clienteAxios.get(`/almacen/bienes/catalogo-bienes/get-by-nombre-nroidentificador/?cod_tipo_activo=${tipo}&nombre=${name}&doc_identificador_nro=${codigo}`).then((res) => {
        dispatch(getArticulos(res.data.Elementos));
    }).catch((error) => {
        Swal.fire({
            target: elementModalId,
            position: "center",
            icon: "error",
            title: error.response.data.detail,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        });
    });
}

export const validarFechas = async (dispatch, fechas) => {
    await clienteAxios.get("almacen/mantenimientos/programados/validar-fechas/", fechas).then((res) => {
        dispatch(previsualizacionFechas(res));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se encontraron fechas",
            showConfirmButton: false,
            timer: 2000,
        });
    }).catch((error) => {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error.response.data.detail,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        });
    });
}