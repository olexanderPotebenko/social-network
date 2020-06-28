import {authApi} from '../api/api.js';
import {stopSubmit} from 'redux-form';
const SET_AUTH_DATA = 'SET-AUTH-DATA';
const SET_SIGN_UP_RESULT = 'SET-SIGN-UP-RESULT';

const initial_state = {
    id: null,
    email: null,
    name: null,
    token: null,
    photo: null,
    is_auth: false,
    is_fetching: false,
    success_sign_up: false,
};

const authReducer = (state = initial_state, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: 
            return setAuthData(state, action.data);
        case SET_SIGN_UP_RESULT:
            return setSignUpResult(state, action.result);
        default:
            return state;
    };
};

const setAuthData = (state, data) => {
    return {
        ...state,
        is_auth: true,
        ...data,
        is_fetching: false,
    };
};

const setSignUpResult = (state, result) => {
    return {
        ...state,
        success_sign_up: result,
    }
};

export const login = (data) => (dispatch) => {

    authApi.signIn(data)
        .then(res => {
            if(res.result_code === 0) {
            dispatch(setAuthDataActionCreator(res.data));
            }else{
                dispatch(stopSubmit('signin', {_error: res.message}));
            };
        });
}

export const signUp = (data) => (dispatch) => {
    authApi.signUp(data)
        .then(res => {
            if(res.result_code === 0) {
                console.log('User successfuly registered!');
                dispatch(setSignUpResultActionCreator(true));
            }else{
                dispatch(stopSubmit('signup', {_error: res.message}));
            };
        });
};

export const setAuthDataActionCreator = data => ({type: SET_AUTH_DATA, data});

export const setSignUpResultActionCreator = result => ({type: SET_SIGN_UP_RESULT, result});

export default authReducer;
