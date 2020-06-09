import React from 'react';
import cls from './ProfileInfo.module.css';

const ProfileInfo = ({photos, fullName}) => {

    let photo = photos ? photos.small : 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png';
    return (
        <div className={cls.profil_info}>
            <img className={cls.avatar} src={photo} />
            <div className={cls.description}>
                <h3 className={cls.myname}>{fullName}</h3>
            </div>
        </div>
    );
};

export default ProfileInfo;
