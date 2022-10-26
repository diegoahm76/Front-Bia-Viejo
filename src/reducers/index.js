import { combineReducers } from "redux";
import { estacionesReducer } from "./estacionesReducer";
import { modalReducer } from "./modalReducer";
import { notificacionesReducer } from "./notificacionesReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
  estaciones: estacionesReducer,
  notificaciones: notificacionesReducer,
});
