import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISeries, ISeriesObject } from '../../../Interfaces/CCD';

const initialState: ISeries = {
    seriesCCD: [],
};

const seriesSlice = createSlice({
    name: "series",
    initialState,
    reducers: {
        getSeriesCCD: (state: ISeries, action: PayloadAction<any>) => {
            state.seriesCCD = action.payload;
        },
    }
})

export const { getSeriesCCD } = seriesSlice.actions;
export default seriesSlice.reducer;
