import {profileApi} from '../api/api.js';

const ADD_POST = 'ADD-POST';
const ADD_NEW_TEXT = 'ADD-NEW-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_POSTS = 'SET-USER-POSTS';

let initial_state = {
    posts: [
        {id: 1, message: 'Hi everybody!', likes: 18},
        {id: 2, message: 'I created new akk', likes: 22},
        {id: 3, message: 'This is my firs project on React!!!', likes: 3},
        {id: 4, message: 'great mood :)', likes: 10}
    ],
    textNewPost: '',
    profile: null,
};

let profileReducer = (state = initial_state, action) => {

    switch (action.type) {
        case(ADD_POST):
            return addPost(state);
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

function addPost (state) {
    let state_copy = {...state};
    state_copy.posts = [...state.posts];
    let obj = {
        id: 6,
        message: state_copy.textNewPost,
        likes: 0
    };

    state_copy.posts.unshift(obj);
    return state_copy;
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

export const setUserProfileActionCreator = profile => ({type: SET_USER_PROFILE, profile});
export const setUserPosts = posts => ({type: SET_USER_POSTS, posts});

export default profileReducer;

