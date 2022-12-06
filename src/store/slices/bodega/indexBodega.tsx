import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
export interface IBodega {
  nombre: string;
  cod_municipio: string;
  direccion: string;
  id_responsable: IdResponsable;
  es_principal: boolean;
}

export interface IdResponsable {
  id_persona: number;
  tipo_documento: {
    cod_tipo_documento: string;
    nombre: string;
    precargado: boolean;
    activo: boolean;
    item_ya_usado: boolean;
    
  };
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  numero_documento:string;
}

export interface IBodegaGeneric {
  bodegaEditar: IBodega;
  bodega: IBodega[];
}

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
      numero_documento:"",
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
        numero_documento:"",
      },
      es_principal: true,
    },
  ],
};

const bodegaSlice = createSlice({
  name: "AdministradorBodegas",
  initialState,
  reducers: {
    crearBodegaAction: (state, action) => {},
    obtenerBodegaAction: (state, action) => {
      state.bodega.push(action.payload);
    },
    eliminarBodegaAction: (state, action) => {},
    editarBodegaAction1: (state, action) => {},
    seleccionarBodegaAction: (state, action) => {
      state.bodegaEditar.nombre = action.payload.nombre;
      state.bodegaEditar.direccion = action.payload.direccion;
      state.bodegaEditar.cod_municipio = action.payload.cod_municipio;
      state.bodegaEditar.id_responsable = action.payload.id_responsable;
      state.bodegaEditar.es_principal = action.payload.es_principal;
    },
  },
});

export const crearBodega = async (dispatch, bodega: IBodega) => {
  await clienteAxios.post("almacen/bodega/create/", bodega).then(() => {
    dispatch(crearBodegaAction(bodega));
    Swal.fire("Correcto", "La bodega se agrego correctamente", "success");
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
