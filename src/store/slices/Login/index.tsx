import { createSlice } from "@reduxjs/toolkit";
import clienteAxios from "../../../config/clienteAxios";


const initialState = {
    user: {},
    loading: false,
    error: null,
    modalSesion: false,
    dataSesion: {}
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