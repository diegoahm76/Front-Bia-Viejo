import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITDR, ITDRObject } from "../../../Interfaces/TDR";

const initialState: ITDR = {
    CCDS: [],
    CCDCurrent: null,
};

const TDRSlice = createSlice({
    name: "TDR",
    initialState,
    reducers: {
        getTDRS: (state: ITDR, action: PayloadAction<ITDRObject[]>) => {
            state.CCDS = action.payload;
        },
        getTDRCurrent: (state: ITDR, action: PayloadAction<ITDRObject | null>) => {
            state.CCDCurrent = action.payload;
        },
    }
})

export const { getTDRS, getTDRCurrent } = TDRSlice.actions;
export default TDRSlice.reducer;
