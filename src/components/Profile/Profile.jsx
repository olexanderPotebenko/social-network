import React from 'react';
import cls from './Profile.module.css';
import CreatePostContainer from './CreatePostContainer/CreatePostContainer.jsx';
import MyPostsContainer from './MyPostsContainer/MyPostsContainer.jsx';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import Poster from './Poster/Poster.jsx';

const Profile = (props) => {

    return (
        <div> 
            <Poster />
            <ProfileInfo />
            <CreatePostContainer />
            <MyPostsContainer /> 
        </div>
    );
};

export default Profile;
