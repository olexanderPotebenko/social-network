import React from 'react';
import cls from './MyPosts.module.css';
import Post from './Post/Post.jsx';


const MyPosts = (props) => {

    let posts = [];
    if(props.posts){
        posts = props.posts.map( (item) =>  
            (<Post message={item.message} likes={item.likes} ></Post>) 
        );
    }

    return (
        <div>

            <div className={cls.posts}>
                {posts}
            </div>

        </div>
    );
};

export default MyPosts;
