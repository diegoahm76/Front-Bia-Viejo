import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import { IBodegaGeneric, IBodegaCreate } from "../../../Interfaces/Bodegas";

const initialState: IBodegaGeneric = {
  bodegaEditar: {
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
  bodega: [
    {
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
  ],
};

const bodegaSlice = createSlice({
  name: "AdministradorBodegas",
  initialState,
  reducers: {
    crearBodegaAction: (state, action) => { },
    obtenerBodegaAction: (state, action) => {
      state.bodega.push(action.payload);
    },
    eliminarBodegaAction: (state, action) => { },
    editarBodegaAction1: (state, action) => { },
    seleccionarBodegaAction: (state, action) => {
      state.bodegaEditar.nombre = action.payload.nombre;
      state.bodegaEditar.direccion = action.payload.direccion;
      state.bodegaEditar.cod_municipio = action.payload.cod_municipio;
      state.bodegaEditar.id_responsable = action.payload.id_responsable;
      state.bodegaEditar.es_principal = action.payload.es_principal;
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

export const editarBodega = async (dispatch, id_bodega) => {
  await clienteAxios
    .put(`almacen/bodega/update/${id_bodega}`, id_bodega)
    .then(() => {
      dispatch(obtenerBodegaAction(id_bodega));
      dispatch(editarBodegaAction1(id_bodega));
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
