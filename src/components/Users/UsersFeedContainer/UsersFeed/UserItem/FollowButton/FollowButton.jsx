import React from 'react';
import cls from './FollowButton.module.css';

const FollowButton = (props) => {

    let onFollow = () => {
        let options = {
            id: props.auth.id,
            user_id: props.user_id,
            token: props.auth.token,
        };
        props.follow(options);
    };

    let onUnfollow = () => {
        let options = {
            id: props.auth.id,
            user_id: props.user_id,
            token: props.auth.token,
        };
        props.unfollow(options);
    };

    let button = props.followed 
        ?
        (<button
            onClick={onUnfollow}>
            FOLLOW
        </button>) 
        :
        (<button 
            onClick={onFollow}>
            UNFOLLOW
        </button>)
    ;

    return (
        <div className={cls.follow_button_wrapper}>
            <div className={cls.follow_button}>
                { button }
            </div>
        </div>
    );
};

export default FollowButton;
