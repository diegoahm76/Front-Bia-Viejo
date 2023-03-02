import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IObjLevels,
  IObjOrganigram,
  IObjUnitys,
  IOrganigram
} from '../../../Interfaces/Organigrama';

const initialStateOrganigrmCurrent = {
  id_organigrama: null,
  nombre: '',
  fecha_terminado: null,
  descripcion: '',
  fecha_puesta_produccion: null,
  fecha_retiro_produccion: null,
  justificacion_nueva_version: null,
  version: '',
  actual: false,
  ruta_resolucion: null
};

const initialState: IOrganigram = {
  moldOrganigram: [],
  organigram: [],
  organigramCurrent: initialStateOrganigrmCurrent,
  levelsOrganigram: [],
  unityOrganigram: []
};

const organigramaSlice = createSlice({
  name: 'organigram',
  initialState,
  reducers: {
    getMoldOrganigrams: (state: any, action: PayloadAction<any[]>) => {
      state.moldOrganigram = action.payload;
    },
    getOrganigrams: (
      state: IOrganigram,
      action: PayloadAction<IObjOrganigram[]>
    ) => {
      state.organigram = action.payload;
    },
    currentOrganigram: (
      state: IOrganigram,
      action: PayloadAction<IObjOrganigram>
    ) => {
      state.organigramCurrent = action.payload;
    },
    getLevels: (state: IOrganigram, action: PayloadAction<IObjLevels[]>) => {
      state.levelsOrganigram = action.payload;
    },
    getUnitys: (state: IOrganigram, action: PayloadAction<IObjUnitys[]>) => {
      state.unityOrganigram = action.payload;
    }
  }
});

export const {
  getMoldOrganigrams,
  getOrganigrams,
  currentOrganigram,
  getLevels,
  getUnitys
} = organigramaSlice.actions;
export default organigramaSlice.reducer;
