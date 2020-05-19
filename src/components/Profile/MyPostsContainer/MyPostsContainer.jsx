import React from 'react';
import MyPosts from './MyPosts/MyPosts.jsx';
import {connect} from 'react-redux';
//<MyPosts posts={store.getState().profilePage.posts} />

let mapsStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    };
};

let mapsDispatchToProps = (dispatch) => {
    return ({

    });
};

const MyPostsContainer = connect(mapsStateToProps, mapsDispatchToProps)(MyPosts);

export default MyPostsContainer;
