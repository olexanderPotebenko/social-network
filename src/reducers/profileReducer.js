import {profileApi} from '../api/api.js';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD-POST';
const ADD_NEW_TEXT = 'ADD-NEW-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_POSTS = 'SET-USER-POSTS';
const SET_LIKES_POST = 'SET_LIKES_POST';
const DELETE_POST = 'DELETE-POST';
const UPDATE_PROFILE = 'UPDATE-PROFILE';

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
        case SET_LIKES_POST:
            let posts = state.posts.map(post => {
                if(post.id != action.post.id){
                    return post;
                }else{
                    return action.post;
                };
            });

            return {
                ...state,
                posts,
            };
        case DELETE_POST: 

            return {
                ...state,
                posts: state.posts.filter(post => {
                    return (post.id != action.post.id)
                }),
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: {...state.profile},
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
            if(data.data.result_code === 0){
                dispatch(setUserProfileActionCreator(data.data));
            }
        });
};

export const getPosts = options => dispatch => {
    profileApi.getPosts(options)
        .then(data => {
            if(data.result_code === 0 ){
                dispatch(setUserPosts(data.posts));
            }
        });
};

export const createPost = options => dispatch => {
    profileApi.createPost(options)
        .then(data => {
            if(data.result_code === 0) {
                dispatch(addPost(data.post));
            }else{
                dispatch(stopSubmit('create_post', {_error: data.message}));
            };
        });
};

export const likedPost = options => dispatch => {
    return profileApi.likedPost(options)
        .then(data => {
            if(data.result_code === 0) {
                return dispatch(setPostLikes( data.post, ));
            }else{
            };
        });
};

export const deletePost = options => dispatch => {
    profileApi.deletePost(options)
        .then(data => {
            if(data.result_code === 0) {
                dispatch(deletePostActionCreator( data.post ));
            }else{
            };
        });
};

export const updateProfile = options => dispatch => {
    return profileApi.updateProfile(options)
        .then(data => {
            if(data.result_code === 0) {
                return dispatch(updateProfileActionCreator() );
            }else{
            };
        });
};


export const setUserProfileActionCreator = profile => ({type: SET_USER_PROFILE, profile});
export const setUserPosts = posts => ({type: SET_USER_POSTS, posts});
export const addPost = post => ({type: ADD_POST, post});
export const setPostLikes = (post) => ({type: SET_LIKES_POST, post}); 
export const deletePostActionCreator = (post) => ({type: DELETE_POST, post});
export const updateProfileActionCreator = () => ({type: UPDATE_PROFILE});

export default profileReducer;


