import React from 'react';
import cls from './MyPosts.module.css';
import Post from './Post/Post.jsx';

let posts_data = [
    {id: 1, message: 'Hi everybody!', likes: 18},
    {id: 2, message: 'I created new akk', likes: 22},
    {id: 3, message: 'This is my firs project on React!!!', likes: 3},
    {id: 4, message: 'great mood :)', likes: 10}
];

let posts = posts_data.map( (item) =>  
    (<Post message={item.message} likes={item.likes} ></Post>) 
);


const MyPosts = (props) => {

    return (
        <div>

            <div className={cls.posts}>
                {posts}
            </div>

        </div>
    );
};

export default MyPosts;
