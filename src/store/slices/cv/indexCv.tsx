import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Icv, IcvArtivlesComputers, IcvComputers, IcvMaintenance, IcvOtherAssets, IcvVehicles } from "../../../Interfaces/CV";

const initialState: Icv = {
    cvOtherAssets: [],
    cvVehicles: null,
    cvComputers: null,
    cvMaintenance: [],
    cvArticles: [],
};

const cvSlice = createSlice({
    name: "cv",
    initialState,
    reducers: {
        getCvOtherAssets: (state: Icv, action: PayloadAction<IcvOtherAssets[]>) => {
            state.cvOtherAssets = action.payload;
        },
        getCvVehicles: (state: Icv, action: PayloadAction<IcvVehicles | null>) => {
            state.cvVehicles = action.payload;
        },
        getCvComputers: (state: Icv, action: PayloadAction<IcvComputers | null>) => {
            state.cvComputers = action.payload;
        },
        getCvMaintenance: (state: Icv, action: PayloadAction<IcvMaintenance[]>) => {
            state.cvMaintenance = action.payload;
        },
        getCvArticles: (state: Icv, action: PayloadAction<IcvArtivlesComputers[]>) => {
            state.cvArticles = action.payload;
        },
    }
})

export const { getCvOtherAssets, getCvVehicles, getCvComputers, getCvMaintenance, getCvArticles } = cvSlice.actions;
export default cvSlice.reducer;
