import React from 'react';
import cls from './Post.module.css';
import Avatar from './Avatar/Avatar.module.jsx';
import Content from './Content/Content.jsx';
import Likes from './Likes/Likes.jsx';

const Post = (props) => {
    
    return (
        <div>
            <Avatar />
           <Content message={props.message} />
            <Likes likes={props.likes} />
        </div>
    );
};

export default Post;
