import React from 'react'
import CreatePost from './CreatePost/CreatePost.jsx';

const CreatePostContainer = (props) => {
    return (
        <CreatePost dispatch={props.store.dispatch}
           textNewPost={props.store.getState().profilePage.textNewPost} 
        />
    );
};

export default CreatePostContainer;
