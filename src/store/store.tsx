import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import modalReducer from "./slices/modal/indexModal";
import loginReducer from "./slices/Login";
import alarmasReducer from "./slices/alarmas/indexAlarma";
import alarmasConfigReducer from "./slices/alarmasConfig/indexAlarmasConfig";
import organigramReducer from './slices/organigrama/indexOrganigram'
import estacionesReducer from "./slices/administradorEstaciones/indexAdministradorEstaciones";
// import thunk from "redux-thunk";
import loadingReducer, {
  cancelLoading,
  startLoading,
} from "./slices/loading/indexLoading";
import instance from "../config/clienteAxiosEstaciones";
import { useAppDispatch } from "./hooks/hooks";

const store = configureStore({
  reducer: {
    login: loginReducer,
    modalSelector: modalReducer,
    alarma: alarmasReducer,
    alarmasConfig: alarmasConfigReducer,
    loading: loadingReducer,
    organigram: organigramReducer,
    administradorEstacionesSlice: estacionesReducer,
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
