import * as actionTypes from "./actionTypes";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const loginUser = (userData, history) => {
  return dispatch => {
    axios
      .post("/api/user/login", userData)
      .then(response => {
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const user = jwt_decode(token);
        dispatch({
          type: actionTypes.LOGIN_USER,
          payload: user
        });
        const timeout = user.exp - Date.now() / 1000;
        setTimeout(() => {
          localStorage.removeItem("jwtToken");
          setAuthToken(false);
          dispatch({
            type: actionTypes.LOGOUT_USER,
            payload: null
          });
        }, timeout * 1000);
        history.push("/dashboard");
      })
      .catch(error => {
        dispatch({
          type: actionTypes.GET_ERROR,
          payload: error.response.data
        });
      });
  };
};

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAuthToken(token);
      const user = jwt_decode(token);
      dispatch({
        type: actionTypes.LOGIN_USER,
        payload: user
      });
      const timeout = user.exp - Date.now() / 1000;
      setTimeout(() => {
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        dispatch({
          type: actionTypes.LOGOUT_USER,
          payload: null
        });
      }, timeout * 1000);
    }
  };
};

export const logoutUser = history => {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch({
      type: actionTypes.LOGOUT_USER,
      payload: null
    });
    dispatch({ type: actionTypes.CLEAR_PROFILE });
    history.push("/login");
  };
};

export const registerUser = (userData, history) => {
  return dispatch => {
    axios
      .post("/api/user/register", userData)
      .then(user => {
        history.push("/login");
      })
      .catch(error => {
        dispatch({
          type: actionTypes.GET_ERROR,
          payload: error.response.data
        });
      });
  };
};
