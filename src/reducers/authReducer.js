import {authApi} from '../api/api.js';
import {stopSubmit} from 'redux-form';
const SET_AUTH_DATA = 'SET-AUTH-DATA';
const SET_SERVER_ERROR = 'SET-SERVER-ERROR';
const SET_IS_FETCHING = 'SET-IS-FETCHING';
const SET_SUBSCRIBED = 'SET-SUBSCRIBED';
const SET_SUBSCRIBERS = 'SET-SUBSCRIBERS';

const initial_state = {
    id: null,
    email: null,
    name: null,
    subscribers: null,
    subscribed_to: null,
    token: null,
    photo: null,
    is_auth: false,
    is_authed: false,
    is_fetching: false,
    server_error: undefined,
    profile: null,
};

const authReducer = (state = initial_state, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: 
            return setAuthData(state, action.data);
        case SET_SERVER_ERROR: 
            return setServerError(state, action.server_error);
        case SET_IS_FETCHING:
            return {
                ...state,
                is_fetching: action.is_fetching,
            };
        case SET_SUBSCRIBED:
            return {
                ...state,
                subscribed_to: (() => {
                    debugger;
                    if(state.subscribed_to.map(user => user.id).includes(action.user.id)){
                        return state.subscribed_to.filter(user => user.id != action.user.id);
                    }else{
                        state.subscribed_to.push(action.user);
                        return state.subscribed_to;
                    }
                })(),
            };
        default:
            return state;
    };
};

const setAuthData = (state, data) => {
    return {
        ...state,
        is_auth: true,
        is_authed: true,
        ...data,
        is_fetching: false,
    };
};

const setServerError = (state, server_error) => {
    return {
        ...state, 
        server_error
    };
};

export const login = (data) => (dispatch) => {

    dispatch(setIsFetching(true));
    authApi.signIn(data)
        .then(res => {
            if(res.result_code === 0) {
                dispatch(setAuthDataActionCreator(res.data));
                dispatch(stopSubmit('signin', {_error: res.message}));
            }else{
                dispatch(setServerErrorActionCreator(res.message));
            };
            dispatch(setIsFetching(false));
        });
}

export const signUp = (data) => (dispatch) => {

    dispatch(setIsFetching(true));
    authApi.signUp(data)
        .then(res => {
            if(res.result_code === 0) {
                console.log('User successfuly registered!');
                dispatch(setServerErrorActionCreator(res.message));
                dispatch(stopSubmit('signup', {_error: res.message}));
            }else{
                dispatch(setServerErrorActionCreator(res.message));
            };
            dispatch(setIsFetching(false));
        });
};
export const setIsFetching = is_fetching => ({type: SET_IS_FETCHING, is_fetching});

export const setAuthDataActionCreator = data => ({type: SET_AUTH_DATA, data});

export const setServerErrorActionCreator = server_error => ({type: SET_SERVER_ERROR, server_error});

export const setSubscribed = user => ({type: SET_SUBSCRIBED, user});

export default authReducer;
