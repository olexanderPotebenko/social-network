import {createStore, combineReducers} from 'redux';
import messagesReducer from '../reducers/messagesReducer.js';
import profileReducer from '../reducers/profileReducer.js';
import sidebarReducer from '../reducers/sidebarReducer.js';

let reducers = combineReducers({
    messagesPage: messagesReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer
});

let store = createStore(reducers);

export default store;
