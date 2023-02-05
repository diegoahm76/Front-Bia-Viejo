import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubSeries, ISubSeriesObject } from "../../../Interfaces/CCD";

const initialState: ISubSeries = {
    subSeriesCCD: [],
    subSeriesCCDCurrent: null,
};

const subSeriesSlice = createSlice({
    name: "subSeries",
    initialState,
    reducers: {
        getSubSeriesCCD: (state: ISubSeries, action: PayloadAction<ISubSeriesObject[]>) => {
            state.subSeriesCCD = action.payload;
        },
        getSubSeriesCCDCurrent: (state: ISubSeries, action: PayloadAction<ISubSeriesObject | null>) => {
            state.subSeriesCCDCurrent = action.payload;
        },
    }
})

export const { getSubSeriesCCD, getSubSeriesCCDCurrent } = subSeriesSlice.actions;
export default subSeriesSlice.reducer;
