import {createStore, combineReducers} from 'redux';
import messagesReducer from '../reducers/messagesReducer.js';
import profileReducer from '../reducers/profileReducer.js';
import sidebarReducer from '../reducers/sidebarReducer.js';
import usersReducer from '../reducers/usersReducer.js';
import authReducer from '../reducers/authReducer.js';

let reducers = combineReducers({
    messagesPage: messagesReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

let store = createStore(reducers);

export default store;
