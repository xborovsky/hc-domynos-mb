import * as actions from './constants';

const initialState = {
    error : false,
    firebaseUser : null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOG_IN:
            return {...state, error : false};
        case actions.LOG_IN_SUCCESS:
            return {...state, error : false, firebaseUser : action.firebaseUserRes};
        case actions.LOG_IN_ERROR:
            return {...state, firebaseUser : null, error : action.error};

        case actions.LOG_OUT:
            return {...state, error : false};
        case actions.LOG_OUT_SUCCESS:
            return {...state, firebaseUser : null, error : false};
        case actions.LOG_OUT_ERROR:
            return {...state, error : action.error};

        default:
            return state;
    }
};

export default authReducer;