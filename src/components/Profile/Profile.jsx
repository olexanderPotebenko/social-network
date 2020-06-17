import React from 'react';
import cls from './Profile.module.css';
import CreatePostContainer from './CreatePostContainer/CreatePostContainer.jsx';
import MyPostsContainer from './MyPostsContainer/MyPostsContainer.jsx';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import Poster from './Poster/Poster.jsx';
import Preloader from '../commons/Preloader/Preloader.jsx';

const Profile = (props) => {

    if(!props.profile) {
        return <Preloader />;
    };

    let {status, name, photos, contacts} = props.profile;
    return (
        <div> 
            <Poster />
            <ProfileInfo 
                aboutMe={status}
                fullName={name}
                photos={photos}
                contacts={contacts} />
            <CreatePostContainer />
            <MyPostsContainer /> 
        </div>
    );
};

export default Profile;
