import {profileApi} from '../api/api.js';
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD-POST';
const ADD_NEW_TEXT = 'ADD-NEW-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_POSTS = 'SET-USER-POSTS';
export const SET_LIKES_POST = 'SET-LIKES-POST';
const DELETE_POST = 'DELETE-POST';
const UPDATE_PROFILE = 'UPDATE-PROFILE';
const SET_PROFILE_FETCHING = 'SET-PROFILE-FETCHING';
const SET_POSTS_FETCHING = 'SET-POSTS-FETCHING';
const RESET_PROFILE_STATE = 'RESET-PROFILE-STATE';

let initial_state = {
  profile: null,
  postsIsFetching: false,
  profileIsFetching: false,
  posts: [
  ],
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
    case SET_PROFILE_FETCHING: 
      return {
        ...state,
        profileIsFetching: action.profileIsFetching,
      };
    case SET_POSTS_FETCHING:
      return {
        ...state,
        postsIsFetching: action.postsIsFetching,
      };
    case RESET_PROFILE_STATE:
      return initial_state;
  };
  return state;
};

function addNewText (state, text) {
  let state_copy = {...state};
  state_copy.textNewPost = text;
  return state_copy;
};

function setUserProfile (state, profile) {
  debugger;
  let state_copy = {...state};
  debugger;
  state_copy.profile = profile;
  debugger;
  return state_copy;
};

export const getProfile = options => dispatch => {
  dispatch(setProfileFetchingAC(true));
  profileApi.getProfile(options)
    .then(data => {
      dispatch(setProfileFetchingAC(false));
      if(data.data.result_code === 0){
        debugger;
        dispatch(setUserProfileActionCreator(data.data));
      }
    });
};

export const getPosts = options => dispatch => {
  dispatch(setPostsFetchingAC(true));
  profileApi.getPosts(options)
    .then(data => {
      dispatch(setPostsFetchingAC(false));
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
const setProfileFetchingAC = profileIsFetching => ({type: SET_PROFILE_FETCHING, profileIsFetching});
const setPostsFetchingAC = postsIsFetching => ({type: SET_POSTS_FETCHING, postsIsFetching});
export const resetProfileState = () => ({type: RESET_PROFILE_STATE});

export default profileReducer;


