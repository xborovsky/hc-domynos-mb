import * as actions from './constants';

export const logIn = (username, password) => ({
    type : actions.LOG_IN,
    username,
    password
});

export const logInSuccess = firebaseUserRes => ({
    type : actions.LOG_IN_SUCCESS,
    firebaseUserRes
});

export const logInError = error => ({
    type : actions.LOG_IN_ERROR,
    error
});

export const logOut = () => ({
    type : actions.LOG_OUT
});

export const logOutSuccess = () => ({
    type : actions.LOG_OUT_SUCCESS
});

export const logOutError = error => ({
    type : actions.LOG_OUT_ERROR,
    error
});