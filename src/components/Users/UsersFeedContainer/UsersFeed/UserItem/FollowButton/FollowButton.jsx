import React from 'react';
import cls from './FollowButton.module.css';

const FollowButton = (props) => {

    let onFollow = () => {
        fetch(`http://127.0.0.1:8080/follow/${props.user_id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf=8',
                    'Authorize': props.auth.token,
                    'id': props.auth.id,
                },
            }).then(res => res.json())
            .then(data => {
                if(data.result_code === 0){
                    props.follow(props.user_id)
                };
            });
    };

    let button = props.followed 
        ?
        (<button
            onClick={()=>props.unfollow(props.user_id)}>
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
