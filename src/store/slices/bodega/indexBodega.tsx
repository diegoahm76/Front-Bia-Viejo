import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import { IBodegaGeneric, IBodegaCreate } from "../../../Interfaces/Bodegas";

const initialState: IBodegaGeneric = {
  bodegaEditar: {
    id_bodega: 0,
    nombre: "",
    cod_municipio: "",
    direccion: "",
    id_responsable: {
      id_persona: 0,
      tipo_documento: {
        nombre: "",
        activo: true,
        cod_tipo_documento: "",
        item_ya_usado: true,
        precargado: true,
      },
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      numero_documento: "",
    },
    es_principal: true,
  },
  bodega: [],
};

const bodegaSlice = createSlice({
  name: "AdministradorBodegas",
  initialState,
  reducers: {
    crearBodegaAction: (state, action) => { },
    obtenerBodegaAction: (state, action) => {
      state.bodega = action.payload
    },
    eliminarBodegaAction: (state, action) => {
      state.bodega = state.bodega.filter((alarm) => alarm.id_bodega !== action.payload)
    },
    editarBodegaAction1: (state, action) => { },
    seleccionarBodegaAction: (state, action) => {
      state.bodegaEditar = action.payload;
    },
  },
});

export const crearBodega = async (dispatch, bodega: IBodegaCreate) => {
  await clienteAxios.post("almacen/bodega/create/", bodega).then(() => {
    // dispatch(crearBodegaAction(bodega));
    Swal.fire("Correcto", "La bodega se agrego correctamente", "success");
  }).catch(() => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Algo pasó, intente de nuevo",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  });
};

export const obtenerBodega = async (dispatch) => {
  await clienteAxios.get("almacen/bodega/get-list/").then((data) => {
    dispatch(obtenerBodegaAction(data.data));
  });
};

export const eliminarBodega = async (dispatch, id_bodega) => {
  await clienteAxios.delete(`almacen/bodega/delete/${id_bodega}`).then(() => {
    dispatch(eliminarBodegaAction(id_bodega));
    Swal.fire("Correcto", "La bodega se elimino correctamente", "success");
  });
};

export const editarBodega = async (dispatch, id_bodega, bodega) => {
  await clienteAxios
    .put(`almacen/bodega/update/${id_bodega}`, bodega)
    .then(() => {
      Swal.fire("Correcto", "La bodega se edito correctamente", "success");
      // dispatch(obtenerBodegaAction(id_bodega));
      dispatch(editarBodegaAction1(bodega));
    });
};

export const seleccionarBodega = async (dispatch, bodega) => {
  dispatch(seleccionarBodegaAction(bodega));
};

export const {
  crearBodegaAction,
  obtenerBodegaAction,
  eliminarBodegaAction,
  editarBodegaAction1,
  seleccionarBodegaAction,
} = bodegaSlice.actions;
export default bodegaSlice.reducer;
