import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../types/userTypes";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
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
