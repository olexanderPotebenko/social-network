import React from 'react';
import MyPosts from './MyPosts/MyPosts.jsx';
import StoreContext from './../../../StoreContext/StoreContext.jsx';


const MyPostsContainer = (props) => {

    return (
    <StoreContext.Consumer>{
        (store) => {
    return (
        <MyPosts posts={store.getState().profilePage.posts} />
    );
        }
    }</StoreContext.Consumer>);
};

export default MyPostsContainer;
