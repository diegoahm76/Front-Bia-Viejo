import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    subSeriesCCD: [],
};

const subSeriesSlice = createSlice({
    name: "subSeries",
    initialState,
    reducers: {
        getSubSeriesCCD: (state: any, action: PayloadAction<any>) => {
            state.subSeriesCCD = action.payload;
        },
    }
})

export const { getSubSeriesCCD } = subSeriesSlice.actions;
export default subSeriesSlice.reducer;
