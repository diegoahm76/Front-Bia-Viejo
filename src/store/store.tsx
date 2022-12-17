import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import modalReducer from "./slices/modal/indexModal";
import loginReducer from "./slices/Login";
import alarmasReducer from "./slices/alarmas/indexAlarma";
import usuarioEstacionesReducer from "./slices/usuarioEstaciones/indexUsuarioEstaciones";
import alarmasConfigReducer from "./slices/alarmasConfig/indexAlarmasConfig";
import bodegaReducer from "./slices/bodega/indexBodega";
import organigramReducer from "./slices/organigrama/indexOrganigram";
import estacionesReducer from "./slices/administradorEstaciones/indexAdministradorEstaciones";
import monitoreoReducer from './slices/Monitoreo/indexMonitoreo'
import configuracionReducer from "./slices/configuracionesEstaciones/indexConfiguracionesEstaciones";
import  marcaReducer  from "./slices/marca/indexMarca";
import bienReducer from "./slices/bienes/indexBien";
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
    login: loginReducer,
    modalSelector: modalReducer,
    alarma: alarmasReducer,
    alarmasConfig: alarmasConfigReducer,
    loading: loadingReducer,
    usuarioEstaciones: usuarioEstacionesReducer,
    administradorEstacionesSlice: estacionesReducer,
    configuracion: configuracionReducer,
    bodegaSlice: bodegaReducer,
    organigram: organigramReducer,
    monitoreoSlice:monitoreoReducer,
    bien:bienReducer,
    marca:marcaReducer
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
