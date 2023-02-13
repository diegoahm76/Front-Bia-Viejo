import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISeries, ISeriesObject } from '../../../Interfaces/CCD';

const initialState: ISeries = {
    seriesCCD: [],
    serieCCDCurrent: null,
};

const seriesSlice = createSlice({
    name: "series",
    initialState,
    reducers: {
        getSeriesCCD: (state: ISeries, action: PayloadAction<ISeriesObject[]>) => {
            state.seriesCCD = action.payload;
        },
        getSerieCCDCurrent: (state: ISeries, action: PayloadAction<ISeriesObject | null>) => {
            state.serieCCDCurrent = action.payload;
        },
    }
})

export const { getSeriesCCD, getSerieCCDCurrent } = seriesSlice.actions;
export default seriesSlice.reducer;
