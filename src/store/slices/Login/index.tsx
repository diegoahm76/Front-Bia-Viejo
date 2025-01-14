import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
export interface IUserInfo {
    permisos: [],
    representante_legal: [],
    userinfo: {
        email: string;
        id_usuario: number;
        is_superuser: boolean;
        nombre_de_usuario: string;
        tokens: {
            access: string;
            refresh: string;
        }
    },
    userSesion: string;
    reintentos: boolean;




}
const initialState: IUserInfo = {
    userinfo: {
        email: "cris",
        id_usuario: 0,
        is_superuser: false,
        nombre_de_usuario: "",
        tokens: {
            access: "",
            refresh: "",
        }
    },
    userSesion: "",
    permisos: [],
    representante_legal: [],
    reintentos: false,


};


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userinfo = action.payload.userinfo;
            state.permisos = action.payload.permisos;
            state.representante_legal = action.payload.representante_legal
            state.reintentos = false;
        },
        logout: (state) => {
            state.userinfo = initialState.userinfo;
            state.representante_legal = initialState.representante_legal;
            state.permisos = initialState.permisos;
            state.reintentos = initialState.reintentos;
        },
        nameSesionUpdate: (state, action) => {
            state.userSesion = action.payload
        },
        setReintentos: (state) => {
            state.reintentos = true;
        }
    }
});

export const { setReintentos, setUserInfo, logout, nameSesionUpdate } = loginSlice.actions;
export default loginSlice.reducer;

export const loginUser = async (dispatch, email: string, password: string) => {
    await clienteAxios.post(
        "users/login/",
        { nombre_de_usuario: email, password },
    ).then((response) => {
        dispatch(setUserInfo(response.data.userinfo));
        localStorage.setItem("userInfo", JSON.stringify(response.data.userinfo));
    }).catch((error) => {
        if (error.response.status === 403) {
            dispatch(setReintentos())
        }
        console.log(setReintentos)
        console.log("soy yo")
        Swal.fire({
            position: "center",
            icon: "warning",
            title: error.response.data.detail,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        });
    });
}
export const logoutUser = (dispatch) => {
    dispatch(logout());
    localStorage.clear();
}
export const getUserFromLocalStorage = (dispatch) => {
    const dataUserJSON = localStorage.getItem("userInfo");
    if (dataUserJSON) {
        const dataUser = JSON.parse(dataUserJSON);
        dispatch(setUserInfo(dataUser));
    }
};

export const changeNameSesion = (dispatch, name: string) => {
    dispatch(nameSesionUpdate(name));
}