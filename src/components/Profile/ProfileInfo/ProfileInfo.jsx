import React from 'react';
import cls from './ProfileInfo.module.css';

const ProfileInfo = (props) => {

    return (
        <div className={cls.profil_info}>
            <img className={cls.avatar} src='https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' />
            <div className={cls.description}>
                <h3 className={cls.myname}>Olexander Ivashenko</h3>
            </div>
        </div>
    );
};

export default ProfileInfo;
