import React from 'react';
import cls from './UserAvatar.module.css';

const UserAvatar = (props) => {

    return (
        <div className={cls.user_avatar}>
            <img src={props.avatar} />
        </div>
    );
};

export default UserAvatar;
