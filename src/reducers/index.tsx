import { combineReducers } from "redux";
import { alarmasConfigReducer } from "./alarmasConfigReducer";
import { alarmasReducer } from "./alarmasReducer";
import { bodegaReducer } from "./bodegaReducer";
import { configuracionesReducer } from "./configuracionesEstacionesReducer";
import { organigramaReducer } from "./organigramaReducer";
import { estacionesReducer } from "./estacionesReducer";
import { modalReducer } from "./modalReducer";
import { monitoreoReducer } from "./monitoreoReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
  estaciones: estacionesReducer,
  alarmas: alarmasReducer,
  alarmasConfig: alarmasConfigReducer,
  bodega: bodegaReducer,
  configuracionesEstaciones: configuracionesReducer,
  monitoreoEstaciones: monitoreoReducer,
  organigrama: organigramaReducer,
  
  

});
