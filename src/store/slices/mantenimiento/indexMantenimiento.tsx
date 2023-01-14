import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { ProgramacionMantenimiento } from "../../../Interfaces/ProgramacionMantenimiento";

const initialState = {
  fechas: [],
  kilometros: [],
  articulos: [],
  arregloTabla: [],
};
const mantenimientoSlice = createSlice({
  name: "mantenimiento",
  initialState,
  reducers: {
    previsualizacionFechas: (state, action) => {
      state.fechas = action.payload;
    },
    previsualizacionKilometros: (state, action) => {
      state.kilometros = action.payload;
    },

    previsualizacionTabla: (state, action) => {
      state.arregloTabla = action.payload;
    },

    eliminarElemento: (state, action) => {
      state.arregloTabla = action.payload;
    },

    getArticulos: (state, action) => {
      state.articulos = action.payload;
    },
  },
});

export const {
  previsualizacionFechas,
  previsualizacionKilometros,
  getArticulos,
  previsualizacionTabla,
  eliminarElemento,
} = mantenimientoSlice.actions;
export default mantenimientoSlice.reducer;

export const obtenerArticulos = async (dispatch, tipo, nombre?, documento?) => {
  const name = nombre === undefined ? "" : nombre;
  const codigo = nombre === undefined ? "" : documento;
  const elementModalId = document.getElementById("modalArticulosId")!;
  await clienteAxios
    .get(
      `/almacen/bienes/catalogo-bienes/get-by-nombre-nroidentificador/?cod_tipo_activo=${tipo}&nombre=${name}&doc_identificador_nro=${codigo}`
    )
    .then((res) => {
      dispatch(getArticulos(res.data.Elementos));
    })
    .catch((error) => {
      Swal.fire({
        target: elementModalId,
        position: "center",
        icon: "error",
        title: error.response.data.detail,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

export const validarFechas = async (dispatch, data) => {
  dispatch(previsualizacionFechas(data));
};

export const validarKilometros = async (dispatch, data) => {
  // await clienteAxios.get("almacen/mantenimientos/programados/validar-fechas/", data).then((res) => {
  //     dispatch(previsualizacionFechas(res));
  //     Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: "Se encontraron fechas",
  //         showConfirmButton: false,
  //         timer: 2000,
  //     });
  // }).catch((error) => {
  //     Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         title: error.response.data.detail,
  //         showConfirmButton: true,
  //         confirmButtonText: "Aceptar",
  //     });
  // });

  dispatch(previsualizacionKilometros(data));
};

export const crearTabla = async (dispatch, fechas, kilometros, data) => {
  let arregloTotal: any = [];
  let index = 0;
  let model: ProgramacionMantenimiento = {
    tipo_programacion: "",
    cod_tipo_mantenimiento: "P",
    kilometraje_programado: null,
    fecha_programada: null,
    motivo_mantenimiento: "Por que si ",
    observaciones: "No aplica",
    fecha_solicitud: formatISO(new Date(), {
      representation: "date",
    }),
    fecha_anulacion: null,
    justificacion_anulacion: "",
    ejecutado: false,
    id_articulo: data.id_articulo,
    id_persona_solicita: data.user_id,
    id_persona_anula: null,
    //datos tabla
    CO: data.codigo,
    SP: data.serial,
    KI: "", //cambiar o debe ser del articulo
    FE: "",
    index: 0,
  };
  fechas.forEach((element) => {
    arregloTotal.push({
      ...model,
      tipo_programacion: "fecha",
      fecha_programada: element,
      FE: element,
      index: index,
    });
    index++;
  });

  kilometros.forEach((element) => {
    arregloTotal.push({
      ...model,
      tipo_programacion: "kilometraje",
      kilometraje_programado: element,
      KI: element,
      index: index,
    });
    index++;
  });
  await dispatch(previsualizacionTabla(arregloTotal));
  return arregloTotal;
};

export const eliminarElementoTabla = async (dispatch, rowData, data) => {
  let table = rowData.filter((item) => {
    return item !== data;
  });
  dispatch(eliminarElemento(table));
  return table;
};
