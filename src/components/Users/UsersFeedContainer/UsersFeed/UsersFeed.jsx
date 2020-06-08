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
            user={item} />
    });

    return (
        <div className={cls.users_feed}>


            <PaginationBar
                className={cls.users_feed_block_1}
                classNam
                page_count={props.total_users_count/props.page_size}
                page_current={props.page_current}
                setUsers={props.setUsers}
                setUsersCount={props.setUsersCount}
                setPageCurrent={props.setPageCurrent}
                setIsFetching={props.setIsFetching}
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
