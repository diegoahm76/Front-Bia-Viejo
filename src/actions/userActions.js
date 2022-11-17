import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOCALSTORAGE_REQUEST,
  USER_LOCALSTORAGE_SUCESS,
  USER_LOCALSTORAGE_NOT_FOUND,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_INVALID,
  USER_REMOVE_ERROR,
} from "../types/userTypes";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await clienteAxios.post(
      "users/login/",
      { email, password },
      config
    );
    console.log("data login", data)
    const { userinfo, permisos } = data;
    userinfo.permisos = permisos
    dispatch(userLoginSuccess(userinfo));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    if(typeof error.response.data === "string"){
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Credenciales invalidas",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    }
    dispatch(userLoginInvalid(error.response.data));
  }
};

const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

const userLoginInvalid = (dataError) => ({
  type: USER_LOGIN_INVALID,
  payload: dataError,
});

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

const userLogout = () => ({
  type: USER_LOGOUT,
});

export const getDataFromLocalStorage = () => (dispatch) => {
  dispatch(getDataLocalStorageRequest());

  const dataUserJSON = localStorage.getItem("userInfo");
  if (dataUserJSON) {
    const dataUser = JSON.parse(dataUserJSON);
    console.log(dataUser)
    dataUser.userinfo.permisos = dataUser.permisos
    dispatch(getDataLocalStorageSuccess(dataUser.userinfo));
  } else {
    dispatch(getDataLocalStorageNotFound());
  }
};

const getDataLocalStorageRequest = () => ({
  type: USER_LOCALSTORAGE_REQUEST,
});

const getDataLocalStorageSuccess = (user) => ({
  type: USER_LOCALSTORAGE_SUCESS,
  payload: user,
});

const getDataLocalStorageNotFound = () => ({
  type: USER_LOCALSTORAGE_NOT_FOUND,
});

export const userRegisterAction = (user) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest());

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await clienteAxios.post("users/register/", user, config);

    dispatch(userRegisterSuccess(data));

    //dispatch(userLoginSuccess(data));

    //localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch(userRegisterFail(error));
  }
};

const userRegisterRequest = () => ({
  type: USER_REGISTER_REQUEST,
});

const userRegisterSuccess = (user) => ({
  type: USER_REGISTER_SUCCESS,
  payload: user,
});

const userRegisterFail = (error) => ({
  type: USER_REGISTER_FAIL,
  payload:
    error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message,
});

export const userRemoveErrorAction = () => async (dispatch) => {
  dispatch(userRemoveError());
};

const userRemoveError = () => ({
  type: USER_REMOVE_ERROR,
});
