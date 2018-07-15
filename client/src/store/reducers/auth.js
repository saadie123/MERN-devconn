import * as actionTypes from '../actions/actionTypes';
const initialState = {
    isAuthenticated: false,
    user: {}
}
const authReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            newState = {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
            return newState;

        case actionTypes.LOGOUT_USER:
            newState = {
                ...state,
                user: action.payload,
                isAuthenticated: false
            }
            return newState;

        default:
            return state;
    }
}

export default authReducer;