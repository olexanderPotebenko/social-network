import React from 'react';
import cls from './Likes.module.css';

const Likes = (props) => {

    return (
        <div>
            {props.likes}
        </div>
    );
};

export default Likes;

