import React from 'react'
import cls from './CreatePost.module.css';

const CreatePost = () => {

    return (
        <div className={cls.wraper}>
            <input placeholder='Enter new post'></input>
            <button>Enter</button>
        </div>
    );
};

export default CreatePost;
