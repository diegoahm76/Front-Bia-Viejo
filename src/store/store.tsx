import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import Login from "./slices/Login";
// import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    login: Login
  }
});

export default store;

// Dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// Selector
export type RootState = ReturnType<typeof store.getState>