import React from 'react'
import CreatePost from './CreatePost/CreatePost.jsx';
import {connect} from 'react-redux';

    let mapsStateToProps = (state) => ({
        textNewPost: state.profilePage.textNewPost
    });

    let mapsDispatchToProps = (dispatch) => ({
        dispatch: dispatch
    });

const CreatePostContainer = connect(mapsStateToProps, mapsDispatchToProps)(CreatePost); 


export default CreatePostContainer;
