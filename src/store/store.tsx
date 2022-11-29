import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import modalReducer  from "./slices/modal/indexModal";
import loginReducer from "./slices/Login";
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    login: loginReducer,
    modalSelector: modalReducer
  }
});

export default store;

// Dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// Selector
export type RootState = ReturnType<typeof store.getState>;