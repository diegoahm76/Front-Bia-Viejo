import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { IConfiguracionEstacionGet } from "../../../Interfaces/ConfiguracionEstacion";
import Swal from "sweetalert2";

const initialState: IConfiguracionEstacionGet = {
  configuracion: [],
  configuracionSeleccionada: {
    idConfiguracion: 0,
    t003frecuencia: 0,
    t003temperaturaAmbienteMax: 0,
    t003temperaturaAmbienteMin: 0,
    t003humedadAmbienteMax: 0,
    t003humedadAmbienteMin: 0,
    t003presionBarometricaMax: 0,
    t003presionBarometricaMin: 0,
    t003velocidadVientoMax: 0,
    t003velocidadVientoMin: 0,
    t003direccionVientoMax: 0,
    t003direccionVientoMin: 0,
    t003precipitacionMax: 0,
    t003precipitacionMin: 0,
    t003luminocidadMax: 0,
    t003luminocidadMin: 0,
    t003nivelAguaMax: 0,
    t003nivelAguaMin: 0,
    t003velocidadAguaMax: 0,
    t003velocidadAguaMin: 0,
    t003fechaMod: "",
    t003userMod: "",
    objectid: 0,
    t001Estaciones: {
      objectid: 0,
      t001nombre: "",
      t001coord1: 0,
      t001coord2: 0,
      t001fechaMod: new Date(),
      t001userMod: "",
    },
  },
};

const configuracionEstacionesSlice = createSlice({
  name: "configuracionEstaciones",
  initialState,
  reducers: {
    obtenerConfiguracionesAction: (state, action) => {
      state.configuracion = action.payload;
    },
    crearConfiguracionAction: (state, action) => {
      state.configuracion.push(action.payload);
    },
    editarConfiguracionAction: (state, action) => {
      state.configuracion.map((alarm, index) => {
        if (alarm.idConfiguracion === action.payload.idConfiguracion) {
          state.configuracion[index] = action.payload;
        }
      });
    },
    seleccionarConfiguracionModal: (state, action) => {
      state.configuracionSeleccionada = action.payload;
    },
  },
});

//EXPORT DE ACTIONS
export const {
  obtenerConfiguracionesAction,
  crearConfiguracionAction,
  editarConfiguracionAction,
  seleccionarConfiguracionModal,
} = configuracionEstacionesSlice.actions;
export default configuracionEstacionesSlice.reducer;

//GET
export const obtenerConguracionEstaciones = async (dispatch) => {
  await clienteEstaciones
    .get("Configuraciones")
    .then((getConfiguraciones) => {
      const formatFechaConfiguraciones = getConfiguraciones.data.map(
        (configuracion) => ({
          ...configuracion,
          t003fechaMod: formatISO(new Date(configuracion.t003fechaMod), {
            representation: "date",
          }),
        })
      );
      dispatch(obtenerConfiguracionesAction(formatFechaConfiguraciones));
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
  //console.log("Configuraciones", getConfiguraciones);

  // const formatFechaConfiguraciones = getConfiguraciones.map(
  //   (configuracion) => ({
  //     ...configuracion,
  //     t003fechaMod: formatISO(new Date(configuracion.t003fechaMod), {
  //       representation: "date",
  //     }),
  //   })
  // );
  // dispatch(obtenerConfiguracionesAction(formatFechaConfiguraciones));
  //console.log("dataGetEstaciones", dataGetEstaciones);
};

//select

export const seleccionarConfiguracion = (dispatch, configuracion) => {
  dispatch(seleccionarConfiguracionModal(configuracion));
};

export const crearConfiguracion = async (dispatch, dataConfiguracion) => {
  await clienteEstaciones.post("Configuracion", dataConfiguracion).then((res) => {
      dispatch(crearConfiguracionAction(dataConfiguracion));
      Swal.fire({
          position: "center",
          icon: "success",
          title: "Configuracion agregada correctamente",
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

//edit
export const editarConfiguracion = async (dispatch, configuracionEdit) => {
  const elementModalId = document.getElementById("modalConfiguracionesId")!;
  const dataModel = construirModelo(configuracionEdit);
  await clienteEstaciones.put("Configuraciones", dataModel).then(() => {
      dispatch(editarConfiguracionAction(dataModel));
      Swal.fire({
          target: elementModalId,
          position: "center",
          icon: "success",
          title: "Configuracion actualizada correctamente",
          showConfirmButton: false,
          timer: 2000,
      });
  }).catch((error) => {
      Swal.fire({
          target: elementModalId,
          position: "center",
          icon: "error",
          title: `Algo pasó, intente de nuevo, ${error.response.data} `,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
      });
  });
};

const construirModelo = (data) => {
  return {
    idConfiguracion: data.idConfiguracion,
    t003frecuencia: data.t003frecuencia,
    t003temperaturaAmbienteMax: data.t003temperaturaAmbienteMax,
    t003temperaturaAmbienteMin: data.t003temperaturaAmbienteMin,
    t003humedadAmbienteMax: data.t003humedadAmbienteMax,
    t003humedadAmbienteMin: data.t003humedadAmbienteMin,
    t003presionBarometricaMax: data.t003presionBarometricaMax,
    t003presionBarometricaMin: data.t003presionBarometricaMin,
    t003velocidadVientoMax: data.t003velocidadVientoMax,
    t003velocidadVientoMin: data.t003velocidadVientoMin,
    t003direccionVientoMax: data.t003direccionVientoMax,
    t003direccionVientoMin: data.t003direccionVientoMin,
    t003precipitacionMax: data.t003precipitacionMax,
    t003precipitacionMin: data.t003precipitacionMin,
    t003luminocidadMax: data.t003luminocidadMax,
    t003luminocidadMin: data.t003luminocidadMin,
    t003nivelAguaMax: data.t003nivelAguaMax,
    t003nivelAguaMin: data.t003nivelAguaMin,
    t003velocidadAguaMax: data.t003velocidadAguaMax,
    t003velocidadAguaMin: data.t003velocidadAguaMin,
    t003fechaMod:data.t003fechaMod,
    t003userMod: data.t003userMod,
    objectid: data.objectid,
    t001Estaciones: {
      objectid: data.t001Estaciones.objectid,
      t001nombre: data.t001Estaciones.t001nombre,
      t001userMod: data.t001Estaciones.t001userMod,
      t001coord1:data.t001Estaciones.t001coord1,
      t001coord2:data.t001Estaciones.t001coord2,
      t001fechaMod:data.t001Estaciones.t001fechaMod,

    },
  }
}

