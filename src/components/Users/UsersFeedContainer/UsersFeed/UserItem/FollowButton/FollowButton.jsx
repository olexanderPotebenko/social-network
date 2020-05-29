import React from 'react';
import cls from './FollowButton.module.css';

const FollowButton = (props) => {

    let button = props.followed 
        ?
            (<button
                onClick={()=>props.unfollow(props.user_id)}>
                FOLLOW
            </button>) 
        :
            (<button 
                onClick={()=>props.follow(props.user_id)}>
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
