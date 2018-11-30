import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../components/admin/login/redux/authReducer';
import { loadState, saveState } from '../util/localStorage';

const persistedState = loadState();

const store = createStore(
    combineReducers({
        authReducer
    }),
    persistedState,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    saveState({
        authReducer : {
            firebaseUser: store.getState().authReducer.firebaseUser
        }
    });
});

export default store;