import { combineReducers } from "redux";
import { alarmasReducer } from "./alarmasReducer";
import { estacionesReducer } from "./estacionesReducer";
import { modalReducer } from "./modalReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
  estaciones: estacionesReducer,
  alarmas: alarmasReducer,
});
