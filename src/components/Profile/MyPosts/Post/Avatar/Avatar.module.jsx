import React from 'react';
import cls from './Avatar.module.css';

const Avatar = () => {

    return (
        <div>
        <img className={cls.icon} src='https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/2c/0c/9a/2c0c9a50-838d-1fc2-2147-5ccc8bc8aad4/source/200x200bb.jpg' />
        </div>
    );
};

export default Avatar;
