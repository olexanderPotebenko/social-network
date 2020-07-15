import React from 'react';
import styles from './Post.module.css';
import {getFormatedDate} from '../../../../../utils/functions';
import heart from '../../../../../assets/images/heart.png';

const Post = (props) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.date}>
                {getFormatedDate(props.date)}
            </div>
            <div className={styles.post}>

                <div className={styles.text}>
                    {props.text}
                </div>

                <div className={styles.likes}>
                    <div className={styles.count}>
                        {props.likes}
                    </div>
                    <img src={heart} />
                </div>
            </div>
        </div>
    );
};

export default Post;

