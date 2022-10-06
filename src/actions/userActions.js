import clienteAxios from "../config/clienteAxios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOCALSTORAGE_REQUEST,
  USER_LOCALSTORAGE_SUCESS,
  USER_LOCALSTORAGE_NOT_FOUND,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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

    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(userLoginFail(error));
  }
};

const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

const userLoginFail = (error) => ({
  type: USER_LOGIN_FAIL,
  payload:
    error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message,
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
    dispatch(getDataLocalStorageSuccess(dataUser));
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

export const userRegisterAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest());

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await clienteAxios.post(
      "users/register/",
      { name, email, password },
      config
    );

    dispatch(userRegisterSuccess(data));

    //dispatch(userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
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
