import * as actionTypes from '../actions/actionTypes';
const initialState = {
    isAuthenticated: false,
    user: {}
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            const newState = {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
            return newState;
    
        default:
            return state;
    }
}

export default authReducer;