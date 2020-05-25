import React from 'react';
import MyPosts from './MyPosts/MyPosts.jsx';
import {connect} from 'react-redux';
//<MyPosts posts={store.getState().profilePage.posts} />

let mapsStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        avatar: 'https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/2c/0c/9a/2c0c9a50-838d-1fc2-2147-5ccc8bc8aad4/source/200x200bb.jpg'
    };
};

let mapsDispatchToProps = (dispatch) => {
    return ({

    });
};

const MyPostsContainer = connect(mapsStateToProps, mapsDispatchToProps)(MyPosts);

export default MyPostsContainer;
