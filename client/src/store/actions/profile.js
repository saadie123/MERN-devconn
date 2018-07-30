import axios from "axios";

import * as actionTypes from "./actionTypes";

export const getCurrentProfile = () => dispatch => {
  dispatch({ type: actionTypes.PROFILE_LOADING });
  axios
    .get("/api/profile")
    .then(response => {
      dispatch({ type: actionTypes.GET_PROFILE, payload: response.data });
    })
    .catch(err => dispatch({ type: actionTypes.GET_PROFILE, payload: {} }));
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(response => {
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch({
        type: actionTypes.GET_ERROR,
        payload: error.response.data
      });
    });
};
