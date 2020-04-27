import React from 'react';
import cls from './Profile.module.css';
import CreatePost from './CreatePost/CreatePost.jsx';
import MyPosts from './MyPosts/MyPosts.jsx';

const Profile = () => {

    return (
        <div> 
            <img className={cls.poster} src='https://www.elsetge.cat/myimg/f/55-558384_mountains-wallpapers-high-resolution-yosemite-desktop-background.jpg' />

            <div className={cls.profil_info}>
                <img className={cls.avatar} src='https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' />
                <div className={cls.description}>
                    <h3 className={cls.myname}>Olexander Ivashenko</h3>
                </div>
            </div>
            <CreatePost />
            <MyPosts />

        </div>
    );
};

export default Profile;
