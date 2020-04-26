import React from 'react';
import cls from './Profile.module.css';

const Profile = () => {

    return (
        <div className={cls.content}> 
            <img className={cls.poster} src='https://www.elsetge.cat/myimg/f/55-558384_mountains-wallpapers-high-resolution-yosemite-desktop-background.jpg' />

            <div className={cls.profil_info}>
                <img className={cls.avatar} src='https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' />
                <div className={cls.description}>
                    <h3 className={cls.myname}>Olexander Ivashenko</h3>
                </div>
            </div>

            <div className={cls.posts}>
                <div>
                    New post
                </div>
                <div>
                    post 1
                </div>
                <div>
                    post 2
                </div>
            </div>



        </div>
    );
};

export default Profile;
