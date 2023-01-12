import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

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
      debugger;
      state.fechas = action.payload;
    },
    previsualizacionKilometros: (state, action) => {
      debugger;
      state.kilometros = action.payload;
    },

    previsualizacionTabla: (state, action) => {
        state.arregloTabla = action.payload;
    },

    eliminarElemento:(state,action)=>{
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

export const validarFechas = async (dispatch, data, arregloPrueba) => {
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

  dispatch(previsualizacionFechas(arregloPrueba));
};

export const validarKilometros = async (dispatch, data, arregloPrueba) => {
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

  dispatch(previsualizacionKilometros(arregloPrueba));
};

export const crearTabla = async (dispatch, fechas, kilometros, data) => {
  debugger;
  let arregloTotal: any = [];
  let model = {
    tipo_programacion: "fecha",
    cod_tipo_mantenimiento: data.tipoMantenimiento.value,
    kilometraje_programado: null,
    fecha_programada: "",
    motivo_mantenimiento: "Por que si ",
    observaciones: "No aplica",
    fecha_solicitud: new Date(),
    fecha_anulacion: null,
    justificacion_anulacion: "",
    ejecutado: false,
    id_articulo: data.id_articulo,
    id_persona_solicita: data.user_id,
    id_persona_anula: null,
  };
  fechas.forEach((element) => {
    arregloTotal.push({ ...model, fecha_programada: element });
  });

  kilometros.forEach((element) => {
    arregloTotal.push({ ...model, fecha_programada: element });
  });
  dispatch(previsualizacionTabla(arregloTotal));
};


export const eliminarElementoTabla = async (dispatch,index ) => {

}
