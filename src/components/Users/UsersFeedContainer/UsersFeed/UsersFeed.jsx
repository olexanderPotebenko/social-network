import React from 'react';
import UserItem from './UserItem/UserItem.jsx';
import PaginationBar from './PaginationBar/PaginationBar.jsx';
import Preloader from '../../../commons/Preloader/Preloader.jsx';
import cls from './UsersFeed.module.css';

const UsersFeed = (props) => {

    let users = props.users.map(item => {

        return <UserItem 
            follow={props.follow}
            unfollow={props.unfollow}
            auth={props.auth}
            user={item} />
    });

    return (
        <div className={cls.users_feed}>


            <PaginationBar
                getUsers={props.getUsers}
                auth={props.auth}
                className={cls.users_feed_block_1}
                page_count={props.total_users_count/props.page_size}
                page_current={props.page_current}
                page_size={props.page_size}
            />
                    <div className={cls.users_feed_block_2}>
                    {
                        !props.is_fetching? 
                            users:
                            <Preloader />
                    }
                        </div>
                    </div>
    );
};


export default UsersFeed;
