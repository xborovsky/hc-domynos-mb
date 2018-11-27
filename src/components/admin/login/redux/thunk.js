import {
    logIn, logInSuccess, logInError,
    logOut, logOutSuccess, logOutError
} from './actions';

import firebase from '../../../../util/firebase';

export const logInUser = (username, password) => dispatch => {
    dispatch(logIn())
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then(res => dispatch(logInSuccess(username)))
        .catch(err => dispatch(logInError(err.message)));
};

export const logOutUser = () => dispatch => {
    dispatch(logOut());
    firebase.auth().signOut()
        .then(() => dispatch(logOutSuccess()))
        .catch(err => dispatch(logOutError(err)))
};