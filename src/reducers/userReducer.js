import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOCALSTORAGE_REQUEST,
  USER_LOCALSTORAGE_SUCESS,
  USER_LOCALSTORAGE_NOT_FOUND,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_INVALID,
  USER_REMOVE_ERROR,
  CHANGE_SESION_REQUEST,
  CHANGE_SESION_SUCCESS,
  CHANGE_SESION_FAIL,
  OPEN_MODAL_SESION,
  CLOSE_MODAL_SESION,
} from "../types/userTypes";

const initialState = {
  user: {},
  loading: false,
  error: null,
  modalSesion: false,
  dataSesion: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOCALSTORAGE_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        user: {},
        loading: false,
        error: null,
      };

    case USER_LOGIN_SUCCESS:
    case USER_LOCALSTORAGE_SUCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };

    case CHANGE_SESION_REQUEST:
      return {
        ...state,
        dataSesion: {}
      }

    case CHANGE_SESION_SUCCESS:
      return {
        ...state,
        modalSesion: false,
        dataSesion: action.payload
      }

    case USER_LOGIN_INVALID:
    case USER_REGISTER_FAIL:
    case CHANGE_SESION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        user: {},
        dataSesion: {},
        modalSesion: false
      };

    case USER_LOCALSTORAGE_NOT_FOUND:
      return {
        ...state,
        loading: false,
      };

    case USER_REMOVE_ERROR:
      return {
        ...state,
        error: null,
      };

    case OPEN_MODAL_SESION:
    case CLOSE_MODAL_SESION:
      return {
        ...state,
        modalSesion: action.payload
      }

    default:
      return state;
  }
};
