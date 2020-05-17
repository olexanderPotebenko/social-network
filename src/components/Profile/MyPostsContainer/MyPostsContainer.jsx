import React from 'react';
import MyPosts from './MyPosts/MyPosts.jsx';


const MyPostsContainer = (props) => {

    return (
        <MyPosts posts={props.store.getState().profilePage.posts} />
    );
};

export default MyPostsContainer;
