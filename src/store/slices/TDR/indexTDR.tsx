import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITDR, ITDRObject } from "../../../Interfaces/TDR";

const initialState: ITDR = {
    TDRS: [],
    TDRSCurrent: null,
};

const TDRSlice = createSlice({
    name: "TDR",
    initialState,
    reducers: {
        getTDRS: (state: ITDR, action: PayloadAction<ITDRObject[]>) => {
            state.TDRS = action.payload;
        },
        getTDRCurrent: (state: ITDR, action: PayloadAction<ITDRObject | null>) => {
            state.TDRSCurrent = action.payload;
        },
    }
})

export const { getTDRS, getTDRCurrent } = TDRSlice.actions;
export default TDRSlice.reducer;
