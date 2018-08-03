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

export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
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

export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
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

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone!")) {
    axios
      .delete("/api/profile")
      .then(response => {
        dispatch({
          type: actionTypes.LOGOUT_USER,
          payload: null
        });
        dispatch({ type: actionTypes.CLEAR_PROFILE });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.GET_ERROR,
          payload: error.response.data
        });
      });
  }
};
