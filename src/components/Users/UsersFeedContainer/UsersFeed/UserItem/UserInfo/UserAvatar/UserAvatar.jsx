import React from 'react';
import cls from './UserAvatar.module.css';
import {NavLink} from 'react-router-dom';

const UserAvatar = (props) => {

    return (
        <NavLink to={`/profile/${props.user_id}/`} >
            <div className={cls.user_avatar}>
                <img src={props.avatar || 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png'} />
            </div>
        </NavLink>
    );
};

export default UserAvatar;
