import { createSlice, Dispatch } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/clienteAxios';
import { IUserInfo } from '../../../Interfaces/auth';

const initialState: IUserInfo = {
  userinfo: {
    email: '',
    nombre_de_usuario: '',
    tokens: {
      refresh: '',
      access: ''
    },
    is_superuser: false,
    id_usuario: 0,
    tipo_usuario: '',
    id_persona: 0,
    tipo_persona: ''
  },
  isLogged: false,
  userSesion: '',
  permisos: [],
  representante_legal: '',
  reintentos: false,
  openDialog: false,
  dialogRepresentante: false,
  entorno: ''
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userinfo = payload.userinfo;
      state.representante_legal = payload.representante_legal;
      state.reintentos = false;
    },
    logout: (state) => {
      state.userinfo = initialState.userinfo;
      state.representante_legal = initialState.representante_legal;
      state.permisos = initialState.permisos;
      state.reintentos = initialState.reintentos;
      state.isLogged = false;
    },
    nameSesionUpdate: (state, action) => {
      state.userSesion = action.payload;
    },
    setReintentos: (state) => {
      state.reintentos = true;
    },
    setPermissions: (state, { payload }) => {
      state.permisos = payload;
    },
    setIslogged: (state) => {
      state.isLogged = true;
    },
    openDialogEntorno: (state) => {
      state.openDialog = true;
    },
    closeDialogEntorno: (state) => {
      state.openDialog = false;
    },
    openDialogRepresentante: (state) => {
      state.dialogRepresentante = true;
    },
    closeDialogRepresentante: (state) => {
      state.dialogRepresentante = true;
    },
    changeEntorno: (state, { payload }) => {
      state.entorno = payload;
      state.openDialog = false;
    },
    // TODO => MOdificar a lo requerido cuando sea necesario
    setRepresentado: (state, { payload }) => {
      state.representante_legal = payload;
    }
  }
});

export const {
  setReintentos,
  setUserInfo,
  logout,
  nameSesionUpdate,
  setPermissions,
  openDialogEntorno,
  closeDialogEntorno,
  changeEntorno,
  openDialogRepresentante,
  setIslogged,
  closeDialogRepresentante,
  setRepresentado
} = loginSlice.actions;

export default loginSlice.reducer;

export const loginUser = async (
  dispatch: any,
  email: string,
  password: string
) => {
  try {
    const {
      data: { userinfo }
    } = await clienteAxios.post('users/login/', {
      nombre_de_usuario: email,
      password
    });

    // Guardamos de manera temporal la información del usuario
    localStorage.setItem('userInfo', JSON.stringify(userinfo));

    dispatch(setUserInfo(userinfo));
  } catch (error: any) {
    if (error.response.status === 403) {
      dispatch(setReintentos());
    }

    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: error.response.data.detail,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar'
    });
  }
};

export const setDataUser = (dispatch: any, data: IUserInfo) => {
  dispatch(setUserInfo(data));
  // borramos los datos temporales
  localStorage.removeItem('tempDataUser');
};

export const logoutUser = (dispatch: any) => {
  dispatch(logout());
  localStorage.clear();
};
export const getUserFromLocalStorage = (dispatch: any) => {
  const dataUserJSON = localStorage.getItem('userInfo');
  if (dataUserJSON) {
    const dataUser = JSON.parse(dataUserJSON);
    dispatch(setUserInfo(dataUser));
  }
};

export const changeNameSesion = (dispatch, name: string) => {
  dispatch(nameSesionUpdate(name));
};

export const getPersmisionsUser: (
  id_usuario: number,
  tipo_entorno: string
) => any = (id_usuario: number, tipo_entorno: string) => {
  return async (dispatch: Dispatch<any>) => {
    const {
      data: { data }
    } = await clienteAxios.get(
      `permisos/permisos-rol/get-by-entorno/?id_usuario=${id_usuario}&tipo_entorno=${tipo_entorno}`
    );
    dispatch(setPermissions(data));
  };
};
