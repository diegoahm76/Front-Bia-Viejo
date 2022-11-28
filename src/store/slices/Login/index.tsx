import { createSlice } from "@reduxjs/toolkit";
import clienteAxios from "../../../config/clienteAxios";

export interface IUserInfo{
    permisos:[],
    representante_legal:{},
    user_info:{
        email:string;
        id_usuario:number;
        is_superuser:boolean;
        nombre_de_usuario:string;
        tokens:{
            access:string;
            refresh:string;
        }
    },
    reintentos:number;

}
const initialState:IUserInfo ={
    user_info:{
        email:"",
        id_usuario:0,
        is_superuser:false,
        nombre_de_usuario:"",
        tokens:{
            access:"",
            refresh:"",
        }
    },
    permisos: [],
    representante_legal: false,
    reintentos:0
  
};


const loginSlice = createSlice({
    name: 'login',
    initialState: {
        initialState
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.initialState = action.payload
        }
    }
});

export const { setUserInfo } = loginSlice.actions;
export default loginSlice.reducer;

export const loginUser = async (dispatch, email: string, password: string) => {
    await clienteAxios.post(
        "users/login/",
        { email, password },
    ).then((response) => {
        console.log("LoginExitoso", response.data);
        dispatch(setUserInfo(response.data));
    }).catch(() => {
        console.log("LoginError");
    });
}