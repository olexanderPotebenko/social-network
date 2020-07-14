import {profileApi} from '../api/api.js';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD-POST';
const ADD_NEW_TEXT = 'ADD-NEW-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_POSTS = 'SET-USER-POSTS';

let initial_state = {
    posts: [
    ],
    profile: null,
};

let profileReducer = (state = initial_state, action) => {

    switch (action.type) {
        case(ADD_POST):
            return {
                ...state,
                posts: state.posts.concat(action.post),
            };
        case(ADD_NEW_TEXT):
            return addNewText(state, action.text);
        case(SET_USER_PROFILE):
            return setUserProfile(state, action.profile);
        case SET_USER_POSTS:
            return {
                ...state, 
                //...state.profile,
                posts: action.posts
            };
    };
    return state;
};

function addNewText (state, text) {
    let state_copy = {...state};
    state_copy.textNewPost = text;
    return state_copy;
};

function setUserProfile (state, profile) {
    let state_copy = {...state};
    state_copy.profile = profile;
    return state_copy;
};

export const getProfile = options => dispatch => {
    profileApi.getProfile(options)
        .then(data => {
            if(data.data.result_code === 0)
                dispatch(setUserProfileActionCreator(data.data));
        });
};

export const getPosts = options => dispatch => {
    profileApi.getPosts(options)
        .then(data => {
            if(data.result_code === 0 ){
                dispatch(setUserPosts(data.posts));
                console.log(data);
            }
        });
};

export const createPost = options => dispatch => {
    profileApi.createPost(options)
        .then(data => {
            if(data.result_code === 0) {
                dispatch(addPost(data.post));
                dispatch(stopSubmit('create_post', {_error: data.message}));
            }else{
            };
        });
};

export const setUserProfileActionCreator = profile => ({type: SET_USER_PROFILE, profile});
export const setUserPosts = posts => ({type: SET_USER_POSTS, posts});
export const addPost = post => ({type: ADD_POST, post});

export default profileReducer;

