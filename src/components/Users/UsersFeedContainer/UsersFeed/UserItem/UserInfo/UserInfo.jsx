import React from 'react';
import cls from './UserInfo.module.css';
import UserName from './UserName/UserName.jsx';
import UserAvatar from './UserAvatar/UserAvatar.jsx';
import UserLocation from './UserLocation/UserLocation.jsx';
import UserAge from './UserAge/UserAge.jsx';

const UserInfo = (props) => {

    return (
        <div className={cls.user_info}>
            <UserAvatar avatar={props.avatar} />
            <UserName name={props.name} />
            {/*<UserAge birth_date={props.birth_date} />*/}
            {/*<UserLocation location={props.location} /> */}
        </div>
    );
};

export default UserInfo;
