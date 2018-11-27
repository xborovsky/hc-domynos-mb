import * as actions from './constants';

const initialState = {
    loggedIn : false,
    error : false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOG_IN:
            return {...state, error : false};
        case actions.LOG_IN_SUCCESS:
            return {...state, loggedIn : true, error : false};
        case actions.LOG_IN_ERROR:
            return {...state, loggedIn : false, error : action.error};

        case actions.LOG_OUT:
            return {...state, error : false};
        case actions.LOG_OUT_SUCCESS:
            return {...state, loggedIn : false, error : false};
        case actions.LOG_OUT_ERROR:
            return {...state, error : action.error};

        default:
            return state;
    }
};

export default authReducer;