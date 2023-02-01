import { configureStore } from "@reduxjs/toolkit";

import alarmasConfigReducer from "./slices/alarmasConfig/indexAlarmasConfig";
import alarmasReducer from "./slices/alarmas/indexAlarma";
import assignmentsReducer from "./slices/assignments/indexAssignments";
import bienReducer from "./slices/catalogoBienes/indexCatalogoBien";
import bodegaReducer from "./slices/bodega/indexBodega";
import CCDReducer from "./slices/CCD/indexCCD";
import configuracionReducer from "./slices/configuracionesEstaciones/indexConfiguracionesEstaciones";
import cvReducer from "./slices/cv/indexCv";
import estacionesReducer from "./slices/administradorEstaciones/indexAdministradorEstaciones";
import loginReducer from "./slices/Login";
import mantenimientoReducer from "./slices/mantenimiento/indexMantenimiento";
import marcaReducer from "./slices/marca/indexMarca";
import modalReducer from "./slices/modal/indexModal";
import monitoreoReducer from './slices/Monitoreo/indexMonitoreo'
import organigramReducer from "./slices/organigrama/indexOrganigram";
import seriesReducer from "./slices/series/indexSeries";
import subSeriesReducer from "./slices/subSeries/indexSubSeries";
import usuarioEstacionesReducer from "./slices/usuarioEstaciones/indexUsuarioEstaciones";

// import thunk from "redux-thunk";
import loadingReducer, {
  cancelLoading,
  startLoading,
} from "./slices/loading/indexLoading";

import instance from "../config/clienteAxiosEstaciones";
import { useAppDispatch } from "./hooks/hooks";
import { configuracionesReducer } from "../reducers/configuracionesEstacionesReducer";

const store = configureStore({
  reducer: {
    administradorEstacionesSlice: estacionesReducer,
    alarma: alarmasReducer,
    alarmasConfig: alarmasConfigReducer,
    assignments: assignmentsReducer,
    bien: bienReducer,
    bodegaSlice: bodegaReducer,
    CCD: CCDReducer,
    configuracion: configuracionReducer,
    cv: cvReducer,
    loading: loadingReducer,
    login: loginReducer,
    mantenimiento: mantenimientoReducer,
    marca: marcaReducer,
    modalSelector: modalReducer,
    monitoreoSlice: monitoreoReducer,
    organigram: organigramReducer,
    series: seriesReducer,
    subSeries: subSeriesReducer,
    usuarioEstaciones: usuarioEstacionesReducer,
  },
});

export default store;

// Dispatch
export type AppDispatch = typeof store.dispatch;
// Selector
export type RootState = ReturnType<typeof store.getState>;

// Interceptors
// instance.interceptors.request.use(
//   () => {
//     startLoading(useAppDispatch);
//   },
//   () => {
//     cancelLoading(useAppDispatch);
//   }
// );

// instance.interceptors.response.use(
//   () => {
//     cancelLoading(useAppDispatch);
//   },
//   () => {
//     cancelLoading(useAppDispatch);
//   }
// );
