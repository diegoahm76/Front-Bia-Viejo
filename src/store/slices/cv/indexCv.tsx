import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Icv, IcvComputers, IcvOtherAssets, IcvVehicles } from "../../../Interfaces/CV";

const initialState: Icv = {
    cvOtherAssets: [],
    cvVehicles: [],
    cvComputers: [],
};

const cvSlice = createSlice({
    name: "cv",
    initialState,
    reducers: {
        getCvOtherAssets: (state: Icv, action: PayloadAction<IcvOtherAssets[]>) => {
            state.cvOtherAssets = action.payload;
        },
        getCvVehicles: (state: Icv, action: PayloadAction<IcvVehicles[]>) => {
            state.cvVehicles = action.payload;
        },
        getCvComputers: (state: Icv, action: PayloadAction<IcvComputers[]>) => {
            state.cvComputers = action.payload;
        },
    }
})

export const { getCvOtherAssets, getCvVehicles, getCvComputers } = cvSlice.actions;
export default cvSlice.reducer;
