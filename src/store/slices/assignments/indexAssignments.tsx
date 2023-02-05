import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAssignments, IAssignmentsObject } from "../../../Interfaces/CCD";

const initialState: IAssignments = {
    assignmentsCCD: [],
    assignmentsCCDCurrent: null,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        getAssignmentsCCD: (state: IAssignments, action: PayloadAction<IAssignmentsObject[]>) => {
            state.assignmentsCCD = action.payload;
        },
        getAssignmentsCCDCurrent: (state: IAssignments, action: PayloadAction<IAssignmentsObject | null>) => {
            state.assignmentsCCDCurrent = action.payload;
        },
    }
})

export const { getAssignmentsCCD, getAssignmentsCCDCurrent } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
