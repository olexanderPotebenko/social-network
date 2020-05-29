import React from 'react';
import cls from './UserItem.module.css';
import UserInfo from './UserInfo/UserInfo.jsx';
import FollowButton from './FollowButton/FollowButton.jsx';

const UserItem = (props) => {

    return (
        <div className={cls.user_item_wrapper}>
            <div className={cls.user_item}>
                <UserInfo
                    avatar={props.user.photos.large}
                    name={props.user.name}
                />
                    <FollowButton 
                        user_id={props.user.id}
                        followed={props.user.followed}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                        </div>
                    </div>
    );
};

export default UserItem;
