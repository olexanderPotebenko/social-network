import React from 'react';
import cls from './FollowButton.module.css';
import {followApi} from '../../../../../../api/api.js';

const FollowButton = (props) => {

    let onFollow = () => {
        let options = {
            id: props.auth.id,
            user_id: props.user_id,
            token: props.auth.token,
        };
        followApi.follow(options)
            .then(data => {
                debugger;
                if(data.result_code === 0){
                    props.follow(props.user_id)
                };
            });
    };

    let onUnfollow = () => {
        let options = {
            id: props.auth.id,
            user_id: props.user_id,
            token: props.auth.token,
        };
        followApi.unfollow(options)
            .then(data => {
                debugger;
                if(data.result_code === 0){
                    props.unfollow(props.user_id)
                };
            });
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
