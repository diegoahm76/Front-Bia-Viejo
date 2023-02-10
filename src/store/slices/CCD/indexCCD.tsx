import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICCD, ICCDObject } from "../../../Interfaces/CCD";

const initialState: ICCD = {
    CCDS: [],
    CCDCurrent: null,
};

const CCDSlice = createSlice({
    name: "CCD",
    initialState,
    reducers: {
        getCCDS: (state: ICCD, action: PayloadAction<ICCDObject[]>) => {
            state.CCDS = action.payload;
        },
        getCCDCurrent: (state: ICCD, action: PayloadAction<ICCDObject | null>) => {
            state.CCDCurrent = action.payload;
        },
    }
})

export const { getCCDS, getCCDCurrent } = CCDSlice.actions;
export default CCDSlice.reducer;
