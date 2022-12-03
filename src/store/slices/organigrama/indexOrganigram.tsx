import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IObjOrganigram, IOrganigram } from "../../../Interfaces/Organigrama";

const initialState: IOrganigram = {
    organigram: [],
    organigramDelete: {},
    organigramEdit: {},
    levelsOrganigram: [],
    unityOrganigram: []
};

const organigramaSlice = createSlice({
    name: "organigram",
    initialState,
    reducers: {
        getOrganigrams: (state: IOrganigram, action: PayloadAction<IObjOrganigram[]>) => {
            state.organigram = action.payload;
        },
        addOrganigrams: (state: IOrganigram, action: PayloadAction<IObjOrganigram>) => {
            state.organigram.push(action.payload)
        }
    }
})

export const { getOrganigrams, addOrganigrams } = organigramaSlice.actions;
export default organigramaSlice.reducer;
