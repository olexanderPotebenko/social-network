import React from 'react'
import CreatePost from './CreatePost/CreatePost.jsx';
import StoreContext from './../../../StoreContext/StoreContext.jsx';

const CreatePostContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {(store) => <CreatePost  
                dispatch={store.dispatch}
            textNewPost={store.getState().profilePage.textNewPost}/>}
        </StoreContext.Consumer>
    );
};

export default CreatePostContainer;
