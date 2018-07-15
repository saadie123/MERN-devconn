import * as actionTypes from '../actions/actionTypes';
const initialState = {
    errors:{}
}
const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ERROR:
            const newState = {
                ...state,
                errors: action.payload
            }
            return newState;
    
        default:
            return state;
    }
}

export default errorReducer;