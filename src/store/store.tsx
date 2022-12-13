import { configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import modalReducer from "./slices/modal/indexModal";
import loginReducer from "./slices/Login";
import alarmasReducer from "./slices/alarmas/indexAlarma";
import alarmasConfigReducer from "./slices/alarmasConfig/indexAlarmasConfig";
import configuracionesReducer from './slices/configuracionEstaciones/indexConfiguraciones'
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    login: loginReducer,
    modalSelector: modalReducer,
    alarma: alarmasReducer,
    alarmasConfig: alarmasConfigReducer,
    configuracionEstacion:configuracionesReducer
  }
});

export default store;

// Dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// Selector
export type RootState = ReturnType<typeof store.getState>;