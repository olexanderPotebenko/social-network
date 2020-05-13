import React from 'react';
import cls from './Profile.module.css';
import CreatePost from './CreatePost/CreatePost.jsx';
import MyPosts from './MyPosts/MyPosts.jsx';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import Poster from './Poster/Poster.jsx';

const Profile = (props) => {

    return (
        <div> 
            <Poster />
            <ProfileInfo />
            <CreatePost 
            dispatch={props.dispatch}
            profilePage={props.profilePage}
            />
            <MyPosts posts={props.profilePage.posts}/>

        </div>
    );
};

export default Profile;
