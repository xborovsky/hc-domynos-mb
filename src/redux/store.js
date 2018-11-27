import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../components/admin/login/redux/authReducer';

const store = createStore(
    combineReducers({
        authReducer
    }),
    applyMiddleware(thunk)
);

export default store;