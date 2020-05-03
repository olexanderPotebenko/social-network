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
            profilePage={props.profilePage}
            addPost={props.addPost}
            addNewText={props.addNewText}
            />
            <MyPosts posts={props.profilePage.posts}/>

        </div>
    );
};

export default Profile;
