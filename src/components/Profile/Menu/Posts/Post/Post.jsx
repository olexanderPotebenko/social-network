import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {

    return (
        <div className={styles.wrapper}>

            <div className={styles.content_wrapper}>
                {props.message}
            </div>

            <div>
                {props.likes}
            </div>
        </div>
    );
};

export default Post;

