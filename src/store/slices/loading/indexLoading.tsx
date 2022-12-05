import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loadingOn: (state) => {
            state.loading = true;
        },
        loadingOff: (state) => {
            state.loading = false;
        }
    }
})

export const { loadingOn, loadingOff } = loadingSlice.actions
export default loadingSlice.reducer;


export const startLoading = (dispatch) => {
    dispatch(loadingOn());
}
export const cancelLoading = (dispatch) => {
    dispatch(loadingOff());
}