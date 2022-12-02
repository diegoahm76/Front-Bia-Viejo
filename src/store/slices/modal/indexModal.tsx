import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalActive: false
}
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalOn: (state) => {
            state.isModalActive = true;
        },
        modalOff: (state) => {
            state.isModalActive = false;
        }
    }
})

export const { modalOn, modalOff } = modalSlice.actions;
export default modalSlice.reducer;

export const modalActionOn = (dispatch) => {
    dispatch(modalOn());
}

export const modalActionOff = (dispatch) => {
    dispatch(modalOff());
}