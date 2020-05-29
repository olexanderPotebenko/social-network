import React from 'react';
import cls from './UserAvatar.module.css';

const UserAvatar = (props) => {

    return (
        <div className={cls.user_avatar}>
            <img src={props.avatar || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'} />
        </div>
    );
};

export default UserAvatar;
