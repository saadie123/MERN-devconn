import * as actionTypes from './actionTypes';
import axios from 'axios';
export const loginUser = (userData) => {
    return dispatch => {
        axios.post('/api/user/login', userData).then(response=>{
            dispatch({
                type: actionTypes.LOGIN_USER,
                payload: response.data
            });
        }).catch(err=>{
            console.log(err.response.data);
        })
    }
}