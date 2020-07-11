import React from 'react';
import cls from './Avatar.module.css';

const Avatar = (props) => {

    return (
        <div>
        <img className={cls.icon} src={props.avatar} />
        </div>
    );
};

export default Avatar;
