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

    let isDisabled = () => {
        return props.is_following_fetching.some(item => item === props.user_id);
    };

    let button = props.followed 
        ?
        (<button
            disabled={isDisabled()}
            onClick={onUnfollow}>
            FOLLOW
        </button>) 
        :
        (<button 
            disabled={isDisabled()}
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
